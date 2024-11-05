import FloatingActionButton from "@/components/FloatingActionButton";
import PlantListItem from "@/components/PlantListItem";
import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { Plant, ThemeMode } from "@/constants/types";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState, createRef, useContext } from "react";
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import geminiService from "../services/geminiService";
import StorageProvider, { StorageContext } from "@/components/StorageProvider";

export default function Home() {
  const themeMode = useColorScheme() as ThemeMode;
  const [cameraOpen, setCameraOpen] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [cameraPermission, requestCameraPermissions] = useCameraPermissions();
  const cameraRef = createRef<CameraView>();
  const {
    isLoading: loadingPlants,
    storage: { plants },
    setPlants,
  } = useContext(StorageContext);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
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
    await requestCameraPermissions();
    setCameraOpen(true);
  };

  const onTakePicture = async () => {
    const capturedPicture = await cameraRef.current!.takePictureAsync({
      base64: true,
    });
    setCameraOpen(false);
    setIsAnalysing(true);
    try {
      const analysedPlant = await geminiService.analyzePlant(
        capturedPicture?.base64!
      );
      analysedPlant.photoUri = capturedPicture?.uri!;
      console.log("geminiResponse", analysedPlant);

      const updatedPlants = [...plants, analysedPlant];

      setPlants(updatedPlants);
    } catch (e) {
      console.log(e);
    }

    setIsAnalysing(false);
  };

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (cameraOpen) {
    return (
      <View style={{ flex: 1, display: "flex" }}>
        <TouchableOpacity
          style={{
            top: 15,
            position: "absolute",
            left: 15,
            zIndex: 10,
          }}
          onPress={() => setCameraOpen(false)}
        >
          <MaterialCommunityIcons name="close" size={32} color="white" />
        </TouchableOpacity>
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
      <Modal animationType="fade" transparent={true} visible={isAnalysing}>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: Colors[themeMode].dark,
              opacity: 0.5,
              zIndex: 10,
            }}
          ></View>
          <View
            style={{
              backgroundColor: Colors[themeMode].primary,
              borderWidth: 2,
              borderColor: Colors[themeMode].light,
              padding: 16,
              borderRadius: theme.borderRadius.card,
              zIndex: 20,
            }}
          >
            <ActivityIndicator color={Colors[themeMode].light} size={"large"} />
            <Text
              style={{
                fontSize: theme.typography.h5,
                color: Colors[themeMode].text,
                marginTop: 10,
              }}
            >
              Analysing plant
            </Text>
            <Text
              style={{
                fontSize: theme.typography.body,
                fontWeight: "300",
                color: Colors[themeMode].text,
                textAlign: "center",
              }}
            >
              Please wait
            </Text>
          </View>
        </View>
      </Modal>
      {loadingPlants && (
        <View style={[styles.baseContainer, styles.center]}>
          <ActivityIndicator
            color={Colors[themeMode].light}
            size={"large"}
          ></ActivityIndicator>
          <Text style={{ color: Colors[themeMode].text, marginTop: 10 }}>
            Loading plants
          </Text>
        </View>
      )}
      {!loadingPlants && plants.length === 0 && (
        <View style={[styles.baseContainer, styles.center]}>
          <Text
            style={[
              styles[`${themeMode}Container`],
              { textAlign: "center", fontSize: theme.typography.h6 },
            ]}
          >
            Your garden is empty
          </Text>
          <Text style={{ fontSize: theme.typography.h5, marginTop: 8 }}>
            🍃
          </Text>
        </View>
      )}
      {!loadingPlants && plants.length > 0 && (
        <FlatList
          data={plants}
          style={styles.list}
          renderItem={({ item }) => <PlantListItem plant={item} />}
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
