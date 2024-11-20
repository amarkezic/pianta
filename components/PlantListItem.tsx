import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { Image } from "expo-image";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Chip from "./Chip";
import { Plant, ThemeMode } from "@/constants/types";
import PopupMenu, { PopupMenuItem } from "./PopupMenu";
import { useContext } from "react";
import { StorageContext } from "./StorageProvider";
import Button from "./Button";
import { ToastContext } from "./ToastProvider";
import { ToastType } from "./Toast";
import { useRouter } from "expo-router";

type Props = {
  plant: Plant;
};

export default function PlantListItem({ plant }: Props) {
  const themeMode = useColorScheme() as ThemeMode;
  const { removePlant, updatePlant } = useContext(StorageContext);
  const { onShowToast } = useContext(ToastContext);
  const router = useRouter();
  const alreadyWatered = !!plant.lastWatered;

  const onDelete = () => {
    onShowToast("Success", "Plant was deleted successfully", ToastType.SUCCESS);
    removePlant(plant);
  };

  const onMarkAsWatered = () => {
    updatePlant(plant.id, { lastWatered: new Date() });

    onShowToast("Success", "Marked as watered", ToastType.SUCCESS);
  };

  const menuItems: PopupMenuItem[] = [
    {
      title: "Delete",
      icon: "trash-can",
      onClick: onDelete,
    },
  ];

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/(tabs)/(plants)/details/[id]",
          params: { id: plant.id },
        });
      }}
    >
      <View style={styles.listItem}>
        <PopupMenu icon={"dots-vertical"} menuItems={menuItems}></PopupMenu>
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            gap: 16,
          }}
        >
          <View style={styles.imageContainer}>
            <Image source={plant.photoUri} style={styles.image} />
          </View>
          <View>
            <Text style={styles.title}>{plant.englishName}</Text>
            <Text style={[styles.subtitle, { color: Colors[themeMode].text }]}>
              <Text style={{ fontWeight: "bold" }}>Last watered: </Text>
              {plant.lastWatered
                ? new Date(plant.lastWatered).toLocaleDateString()
                : "Not yet"}
            </Text>
            <Text style={[styles.subtitle, { color: Colors[themeMode].text }]}>
              <Text style={{ fontWeight: "bold" }}>Last fertilized: </Text>
              {plant.lastFertilized
                ? new Date(plant.lastFertilized).toLocaleDateString()
                : "Not yet"}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.subtitle,
              { marginBottom: 8, color: Colors[themeMode].text },
            ]}
          >
            Plant care:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            <Chip
              icon={"water"}
              text={`${plant.waterSchedule.times}x ${plant.waterSchedule.repeatEvery}`}
              color={Colors[themeMode].blue}
            />
            <Chip
              icon={"sprinkler"}
              text={`${plant.waterSchedule.times}x ${plant.fertilizationSchedule.repeatEvery}`}
              color={Colors[themeMode].primary}
            />
            <Chip
              icon={"white-balance-sunny"}
              text={plant.sunlight.amount.toLowerCase()}
              color={Colors[themeMode].warning}
            />
            <Chip
              icon={"weather-fog"}
              text={`${plant.humidity.amount.toLowerCase()}`}
              color={Colors[themeMode].gray}
            />
          </ScrollView>
        </View>
        <View>
          <Button
            onPress={onMarkAsWatered}
            disabled={alreadyWatered}
            value={alreadyWatered ? "Already watered" : "Mark as watered"}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: theme.borderRadius.listItem,
    borderColor: Colors.dark.light,
    borderWidth: 1,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginVertical: 8,
    position: "relative",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  imageContainer: {
    borderRadius: theme.borderRadius.image,
    borderWidth: 1,
    borderColor: Colors.dark.light,
    padding: 3,
    width: 68,
    height: 68,
  },
  title: {
    color: Colors.dark.text,
    fontSize: theme.typography.h5,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: theme.typography.body,
    fontWeight: "bold",
  },
  description: {
    color: Colors.dark.text,
    fontSize: 10,
  },
});
