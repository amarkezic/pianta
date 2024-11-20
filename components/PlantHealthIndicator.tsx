import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { ThemeMode } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";
import { reload } from "expo-router/build/global-state/routing";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Animated, {
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  value: number;
};

export function PlantHealthIndicator({ value }: Props) {
  const themeMode = useColorScheme() as ThemeMode;
  const progressBar = useRef<View>(null);
  const indicatorValue = useSharedValue(0);

  useEffect(() => {
    if (progressBar.current) {
      progressBar.current.measureInWindow((x, y, width, height) => {
        let newIndicatorValue = value * width - 8;
        if (newIndicatorValue < 0) {
          newIndicatorValue = 2;
        } else if (value >= 1) {
          newIndicatorValue = width - 12;
        }
        indicatorValue.value = withSpring(newIndicatorValue);
      });
    }
  }, [value]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text
        style={{
          color: Colors[themeMode].text,
          fontSize: theme.typography.body,
        }}
      >
        Poor
      </Text>
      <View
        ref={progressBar}
        style={[styles.progressBar, { borderColor: Colors[themeMode].light }]}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 0 }}
          // Background Linear Gradient
          colors={["transparent", Colors[themeMode].success]}
          style={styles.progressBarGradient}
        />
        <Animated.View
          style={[
            styles.progressBarIndicator,
            { left: indicatorValue, backgroundColor: Colors[themeMode].light },
          ]}
        />
      </View>
      <Text
        style={{
          color: Colors[themeMode].text,
          fontSize: theme.typography.body,
        }}
      >
        Good
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    position: "relative",
    height: 14,
    flex: 1,
    borderWidth: 1,
    borderRadius: theme.borderRadius.listItem,
    overflow: "hidden",
  },
  progressBarGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  progressBarIndicator: {
    position: "absolute",
    top: 2,
    borderRadius: 10,
    height: 8,
    width: 8,
  },
});
