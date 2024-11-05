import { MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef } from "react";
import { Pressable, StyleProp, TextStyle, View } from "react-native";

type Props = {
  icon: string;
  onPress: () => void;
  onBlur?: () => void;
  size?: number;
  style?: StyleProp<TextStyle>;
  ref?: React.MutableRefObject<any>;
};

// Collapse is set to false on view because https://github.com/facebook/react-native/issues/29712
export default forwardRef<View, Props>(function IconButton(
  { icon, onPress, size = 48, style, onBlur },
  ref
) {
  return (
    <Pressable onPress={onPress} onBlur={onBlur}>
      <View ref={ref} collapsable={false}>
        <MaterialCommunityIcons
          name={icon as any}
          color="white"
          size={size}
          style={style}
        />
      </View>
    </Pressable>
  );
});
