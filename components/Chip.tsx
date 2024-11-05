import { Colors } from "@/constants/Colors";
import { ThemeMode } from "@/constants/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Text, useColorScheme, View } from "react-native";

type Props = {
  text: string;
  color?: string;
  icon?: string;
};

export default function Chip({ text, color, icon }: Props) {
  const themeMode = useColorScheme() as ThemeMode;

  return (
    <View
      style={{
        backgroundColor: color,
        paddingHorizontal: 10,
        padding: 6,
        borderRadius: 32,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        borderWidth: 1,
        borderColor: Colors[themeMode].light,
      }}
    >
      {icon && (
        <MaterialCommunityIcons name={icon as any} color={Colors[themeMode].light} size={16} />
      )}
      <Text style={{ color: Colors[themeMode].light }}>{text}</Text>
    </View>
  );
}
