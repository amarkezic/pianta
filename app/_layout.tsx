import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import StorageProvider from "@/components/StorageProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { AuthProvider } from "@/contexts/authProvider";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const themeMode = useColorScheme() ?? "light";

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ToastProvider>
      <AuthProvider>
        <StorageProvider>
          <ThemeProvider
            value={themeMode === "dark" ? DarkTheme : DefaultTheme}
          >
            <StatusBar style="auto" />
            <Stack
              screenOptions={{
                header: () => {
                  return (
                    <View
                      style={{
                        height: 30,
                        backgroundColor: Colors[themeMode].background,
                      }}
                    ></View>
                  );
                },
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="sign-in" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </StorageProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
