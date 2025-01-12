import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { useSession } from "@/contexts/authProvider";
import { Image } from "expo-image";
import { Text, useColorScheme, View, StyleSheet } from "react-native";

export default function Account() {
  const themeMode = useColorScheme() ?? "light";
  const { signOut, user } = useSession();

  return (
    <View
      style={[
        styles.baseContainer,
        {
          backgroundColor: Colors[themeMode].background,
        },
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Image
          source={user?.photoURL}
          style={{ width: 48, height: 48, borderRadius: 100 }}
        />
        <Text
          style={{
            fontSize: theme.typography.h1,
            color: Colors[themeMode].text,
          }}
        >
          {user?.displayName}
        </Text>
      </View>
      <View
        style={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              fontSize: theme.typography.body,
              fontWeight: "bold",
              color: Colors[themeMode].text,
              marginRight: 8,
            }}
          >
            Email:
          </Text>
          <Text
            style={{
              fontSize: theme.typography.body,
              color: Colors[themeMode].text,
            }}
          >
            {user?.email}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
      <Button onPress={signOut} value="Sign out" />
    </View>
  );
}

const styles = StyleSheet.create<{ [key: string]: any }>({
  baseContainer: {
    height: "100%",
    display: "flex",
    padding: theme.padding.container,
  },
});
