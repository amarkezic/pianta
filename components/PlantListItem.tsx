import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { Image } from "expo-image";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Chip from "./Chip";
import { Plant, ThemeMode } from "@/constants/types";
import PopupMenu, { PopupMenuItem } from "./PopupMenu";
import { useContext } from "react";
import { StorageContext } from "./StorageProvider";

type Props = {
  plant: Plant;
};

export default function PlantListItem({ plant }: Props) {
  const themeMode = useColorScheme() as ThemeMode;
  const { removePlant } = useContext(StorageContext);
  const onDelete = () => {
    removePlant(plant);
  };
  const menuItems: PopupMenuItem[] = [
    {
      title: "Delete",
      icon: "trash-can",
      onClick: onDelete,
    },
  ];

  return (
    <View style={styles.listItem}>
      <View style={styles.imageContainer}>
        <Image source={plant.photoUri} style={styles.image} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{plant.name}</Text>
        <Text style={{ fontSize: 10, color: Colors[themeMode].text }}></Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip
            icon={"water"}
            text={`${plant.waterSchedule.repeatEvery}`}
            color={Colors[themeMode].blue}
          />
          <Chip
            icon={"white-balance-sunny"}
            text={plant.sunlight.toLowerCase()}
            color={Colors[themeMode].warning}
          />
          <Chip
            icon={"sprinkler"}
            text={`${plant.fertilizationSchedule.repeatEvery}`}
            color={Colors[themeMode].primary}
          />
        </View>
      </View>
      <PopupMenu icon={"dots-vertical"} menuItems={menuItems}></PopupMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: theme.borderRadius.listItem,
    borderColor: Colors.dark.light,
    borderWidth: 1,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    marginVertical: 8,
    position: "relative",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.listItem,
  },
  imageContainer: {
    borderRadius: theme.borderRadius.listItem,
    borderWidth: 1,
    borderColor: Colors.dark.light,
    padding: 3,
    width: 68,
    height: 68,
  },
  title: {
    color: Colors.dark.text,
    fontSize: theme.typography.h5,
  },
  description: {
    color: Colors.dark.text,
    fontSize: 10,
  },
});
