import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { ThemeMode } from "@/constants/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, useColorScheme, View } from "react-native";

export default function WeatherComponent() {
  const themeMode = useColorScheme() as ThemeMode;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name="weather-partly-cloudy" color={Colors[themeMode].text} size={18}/>
      <Text style={{ fontSize: theme.typography.body, color: Colors[themeMode].text }}>
        20°C | Partly Cloudy
      </Text>
    </View>
  );
}
