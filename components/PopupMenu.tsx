import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import theme from "@/constants/Theme";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import React from "react";
import { Position } from "@/constants/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  icon: string;
  menuItems: PopupMenuItem[];
};

export type PopupMenuItem = {
  title: string;
  onClick: () => void;
  icon?: string;
};

const menuItemLength = 40;
const dropdownWith = 100;
const animationDuration = 200;
const Item = ({ item }: { item: PopupMenuItem }) => {
  return (
    <TouchableOpacity onPress={item.onClick}>
      <View key={item.title} style={{ height: menuItemLength, padding: 8, display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
        {item.icon && (
          <MaterialCommunityIcons name={item.icon as any} size={16} />
        )}
        <Text style={{ paddingBottom: 1 }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function PopupMenu({ icon, menuItems }: Props) {
  const [menuOpened, setMenuOpened] = useState(false);
  const height = useSharedValue(0);
  const triggerRef = useRef<View>(null);
  const menuRef = useRef<View>(null);
  const [popupPosition, setPopupPosition] = useState<Position>({ x: 0, y: 0 });

  const onTriggerMenu = () => {
    const newMenuState = !menuOpened;

    height.value = withTiming(
      newMenuState ? menuItemLength * menuItems.length : 0,
      { duration: animationDuration }
    );
    if (!newMenuState) {
      setTimeout(() => {
        setMenuOpened(false);
      }, animationDuration);
    } else {
      setMenuOpened(newMenuState);
    }
  };

  useEffect(() => {
    if (!triggerRef.current || !menuRef.current || !menuOpened) {
      return;
    }
    triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
      setPopupPosition({
        x: pageX - dropdownWith,
        y: pageY + height,
      });
    });
  }, [menuOpened]);

  return (
    <>
      <IconButton
        ref={triggerRef}
        icon={icon}
        onPress={onTriggerMenu}
        size={20}
        style={{ position: "absolute", top: 0, right: 0 }}
      />
      <Modal transparent={true} visible={menuOpened}>
        <TouchableWithoutFeedback onPress={onTriggerMenu}>
          <View style={{ flex: 1 }}></View>
        </TouchableWithoutFeedback>
        <Animated.View
          ref={menuRef}
          style={{
            position: "absolute",
            backgroundColor: "white",
            display: "flex",
            zIndex: 100,
            top: popupPosition.y,
            left: popupPosition.x,
            overflow: "hidden",
            borderRadius: theme.borderRadius.listItem,
            height: height,
            width: dropdownWith,
          }}
        >
          <FlatList data={menuItems} renderItem={Item} />
        </Animated.View>
      </Modal>
    </>
  );
}
