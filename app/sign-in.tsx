import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import logoBlack from "../assets/images/logo-black.png";
import logoWhite from "../assets/images/logo-white.png";
import { ThemeMode } from "@/constants/types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useSession } from "@/contexts/authProvider";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
});

export default function SignIn() {
  const themeMode = useColorScheme() ?? "light";
  const { session, user } = useSession();

  async function onLoginWithGoogle() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();

    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      throw new Error("No ID token found");
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return await auth().signInWithCredential(googleCredential);
  }

  console.log(session, user);

  if (user) {
    return <Redirect href={"/"} />;
  }

  return (
    <View
      style={[styles.root, { backgroundColor: Colors[themeMode].background }]}
    >
      <Image
        source={themeMode === ThemeMode.DARK ? logoWhite : logoBlack}
        style={{ width: 96, height: 96 }}
      />
      <Text
        style={{
          fontSize: theme.typography.h3,
          color: Colors[themeMode].text,
          fontWeight: "bold",
          marginBottom: 32,
        }}
      >
        Pianta
      </Text>
      <View style={{ width: "100%" }}>
        <Button
          value="Sign with google"
          onPress={async () => {
            await onLoginWithGoogle();
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            router.replace("/");
          }}
          icon={"google"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.padding.container,
  },
});
