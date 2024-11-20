import { Color, Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { ThemeMode } from "@/constants/types";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Children, ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  color: Color;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, color, style }: Props) {
  const themeMode = useColorScheme() as ThemeMode;
  return (
    <View
      style={[
        style,
        styles.card,
        {
          backgroundColor: Colors[themeMode][color],
          borderColor: Colors[themeMode].light,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.card,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
