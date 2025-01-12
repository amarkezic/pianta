import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { ThemeMode } from "@/constants/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

type Props = {
  value: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: any;
  type?: "primary" | "secondary";
};

export default function Button({
  value,
  onPress,
  icon,
  type = "primary",
  disabled,
}: Props) {
  const themeMode = useColorScheme() as ThemeMode;
  const buttonShadowBottom = useSharedValue(5);

  const onButtonPress = () => {
    if (disabled) {
      return;
    }
    buttonShadowBottom.value = withTiming(0, { duration: 100 });

    onPress();
  };

  const onButtonLift = () => {
    if (disabled) {
      return;
    }

    buttonShadowBottom.value = withTiming(5, { duration: 100 });
  };

  return (
    <Pressable onTouchStart={onButtonPress} onTouchEnd={onButtonLift}>
      <View
        style={{
          position: "relative",
          marginTop: 5,
        }}
      >
        <Animated.View
          style={[
            styles.button,
            {
              backgroundColor: disabled
                ? Colors[themeMode].darkGray
                : Colors[themeMode][type],
              position: "absolute",
              width: "100%",
              bottom: buttonShadowBottom,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              { color: Colors[themeMode].text, opacity: disabled ? 0.5 : 1 },
            ]}
          >
            {icon && <MaterialCommunityIcons name={"google"} size={14} />}
            {` ${value}`}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.button,
            {
              zIndex: 1,
              backgroundColor: Colors[themeMode].gray,
            },
          ]}
        >
          <Text>&nbsp;</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: theme.borderRadius.button,
    borderColor: Colors.dark.light,
    zIndex: 10,
  },
  buttonShadow: {
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: theme.borderRadius.button,
    zIndex: 10,
  },
  text: {
    textAlign: "center",
    fontSize: theme.typography.body,
    fontWeight: "bold",
  },
});
