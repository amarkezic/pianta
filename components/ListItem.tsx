import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  image: string;
  title: string;
  description: string;
};

export default function ListItem({ image, title, description }: Props) {
  return (
    <View style={styles.listItem}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
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
    gap: 8,
    marginVertical: 8,
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
  },
  title: {
    color: Colors.dark.text,
    fontSize: theme.typography.h5,
  },
});
