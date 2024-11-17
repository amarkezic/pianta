import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import Toast from "@/components/Toast";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].light,
        headerShown: true,
        header: () => (
          <View
            style={{
              backgroundColor: Colors[colorScheme].background,
            }}
          >
            <Toast/>
          </View>
        ),
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
      }}
    >
      <Tabs.Screen
        name="(plants)"
        options={{
          title: "Plants",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "flower-tulip" : "flower-tulip-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-circle" : "account-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
