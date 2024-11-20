import { Card } from "@/components/Card";
import { PlantHealthIndicator } from "@/components/PlantHealthIndicator";
import { StorageContext } from "@/components/StorageProvider";
import { Color, Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { ThemeMode } from "@/constants/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

function ScheduleCard({
  schedule,
  color,
  title,
  icon,
}: {
  schedule: any; // TODO typing
  color: Color;
  title: string;
  icon: string;
}) {
  const themeMode = useColorScheme() as ThemeMode;

  return (
    <Card color={color} style={{ marginBottom: 16 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name={icon as any}
          size={16}
          color={Colors[themeMode].text}
        ></MaterialCommunityIcons>
        <Text
          style={{
            color: Colors[themeMode].text,
            fontSize: theme.typography.h6,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </View>
      <Text style={{ color: Colors[themeMode].text }}>
        {schedule.description}
      </Text>
      {typeof schedule.amount === "number" ? (
        <Text style={{ color: Colors[themeMode].text, marginTop: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Amount:&nbsp;</Text>
          {schedule.times}x {schedule.amount} {schedule.unit} every{" "}
          {schedule.repeatEvery}
        </Text>
      ) : (
        <Text style={{ color: Colors[themeMode].text, marginTop: 8, textTransform: "capitalize"  }}>
          <Text style={{ fontWeight: "bold"}}>Amount:&nbsp;</Text>
          {`${schedule.amount}`.toLowerCase()}
        </Text>
      )}
    </Card>
  );
}

export default function PlantDetails() {
  const themeMode = useColorScheme() as ThemeMode;
  const { storage } = useContext(StorageContext);
  const { id } = useLocalSearchParams();
  const plantData = storage.plants.find((plant) => plant.id === id);

  if (!plantData) {
    return <Redirect href={"/"} />;
  }

  return (
    <View
      style={[
        styles.baseContainer,
        { backgroundColor: Colors[themeMode].background },
      ]}
    >
      <Image source={{ uri: plantData?.photoUri }} style={[styles.image]} />
      <View>
        <Text
          style={{
            fontSize: theme.typography.h3,
            color: Colors[themeMode].text,
          }}
        >
          {plantData.englishName}
        </Text>
        <Text
          style={{
            fontSize: theme.typography.subtitle,
            color: Colors[themeMode].gray,
          }}
        >
          {plantData.latinName}
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginTop: 12,
            fontSize: theme.typography.h5,
            color: Colors[themeMode].text,
          }}
        >
          Plant health
        </Text>
        <PlantHealthIndicator value={plantData.healthScore} />
      </View>
      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 24,
          gap: 16,
        }}
      >
        <ScheduleCard
          schedule={plantData.waterSchedule}
          color="blue"
          title="Watering"
          icon="water"
        />
        <ScheduleCard
          schedule={plantData.fertilizationSchedule}
          color="primary"
          title="Fertilizing"
          icon="sprinkler"
        />
        <ScheduleCard
          schedule={plantData.sunlight}
          color="warning"
          title="Sunlight"
          icon="white-balance-sunny"
        />
        <ScheduleCard
          schedule={plantData.humidity}
          color="gray"
          title="Humidity"
          icon="weather-fog"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    height: "100%",
    display: "flex",
    padding: theme.padding.container,
    gap: 4,
    flexDirection: "column",
  },
  image: {
    height: 150,
    width: "100%",
    backgroundColor: "white",
    borderRadius: theme.borderRadius.image,
  },
});
