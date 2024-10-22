import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  color?: "primary" | "secondary";
  onPress: () => void;
  icon?: any;
  style?: ViewStyle;
};

export default function FloatingActionButton({
  color = "primary",
  icon,
  onPress,
  style,
}: Props) {
  const themeMode = useColorScheme() ?? "light";
  return (
    <View
      style={[
        styles.main,
        { backgroundColor: Colors[themeMode][color] },
        style,
      ]}
    >
      <Pressable onPress={onPress}>
        {icon && <MaterialCommunityIcons name={icon} color="white" size={48} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    right: theme.padding.container,
    bottom: theme.padding.container,
    zIndex: 1,
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "white",
  },
});
