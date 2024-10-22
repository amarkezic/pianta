import FloatingActionButton from "@/components/FloatingActionButton";
import ListItem from "@/components/ListItem";
import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { Plant } from "@/constants/types";
import { useColorScheme } from "@/hooks/useColorScheme";
import { plantsMock } from "@/mocks/data";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const themeMode = useColorScheme();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [plants, setPlants] = useState<Plant[]>(plantsMock);
  const [cameraPermission, requestCameraPermissions] = useCameraPermissions();
  const cameraRef = useRef<CameraView>();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        console.log("backhandler", cameraOpen);
        if (cameraOpen) {
          setCameraOpen(false);
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, []);

  const onAddClick = async () => {
    const response = await requestCameraPermissions();

    setCameraOpen(true);
  };

  const onTakePicture = () => {
    console.log(cameraRef.current);
    const picture = cameraRef.current!.takePictureAsync();
    console.log(picture);
  };

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (cameraOpen) {
    return (
      <View style={{ flex: 1, display: "flex" }}>
        <CameraView style={{ flex: 1 }} facing={"back"} ref={cameraRef} />
        <TouchableOpacity
          onPress={onTakePicture}
          style={{
            bottom: 50,
            position: "absolute",
            right: "50%",
            transform: [{ translateX: 32 }],
            zIndex: 10,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: Colors[themeMode].primary,
              borderWidth: 4,
              borderColor: Colors[themeMode].light,
            }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.baseContainer,
        themeMode === "dark" ? styles.darkContainer : styles.darkContainer,
      ]}
    >
      {cameraOpen && (
        <View style={styles.baseContainer}>
          <CameraView style={{ flex: 1 }} facing="back" />
        </View>
      )}
      {plants.length === 0 && (
        <View style={[styles.baseContainer, styles.center]}>
          <Text
            style={[styles[`${themeMode}Container`], { textAlign: "center" }]}
          >
            No plants
          </Text>
        </View>
      )}
      {plants.length > 0 && (
        <FlatList
          data={plants}
          style={styles.list}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              description={item.about}
              image={item.photo}
            />
          )}
        />
      )}
      <FloatingActionButton
        icon={"plus"}
        onPress={() => {
          onAddClick();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create<{ [key: string]: any }>({
  list: {
    marginVertical: -8,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  baseContainer: {
    height: "100%",
    display: "flex",
    padding: theme.padding.container,
  },
  darkContainer: {
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text,
  },
  lightContainer: {
    backgroundColor: Colors.light.background,
    color: Colors.light.dark,
  },
  lightText: {
    color: Colors.light.text,
  },
  darkText: {
    color: Colors.dark.text,
  },
});
