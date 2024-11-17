import { Colors } from "@/constants/Colors";
import theme from "@/constants/Theme";
import { ThemeMode } from "@/constants/types";
import { useContext, useEffect } from "react";
import { Text, useColorScheme, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { ToastContext } from "./ToastProvider";

export type Toast = {
  id: string;
  title: string;
  description: string;
  type: ToastType;
};

export enum ToastType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
}

type ToastCardProps = {
  toast: Toast;
  index: number;
};

function ToastCard({ toast, index }: ToastCardProps) {
  const themeMode = useColorScheme() as ThemeMode;
  const hiddenToastTop = -124;
  const multipleToastLeftStart = 16;
  const top = useSharedValue(hiddenToastTop);
  const left = useSharedValue(16);
  const { onRemoveToast, toasts } = useContext(ToastContext);

  useEffect(() => {
    top.value = withSpring(15 - index * 5);
    left.value = withTiming(
      multipleToastLeftStart + index * 2
    );

    // TODO not the best way to do it with timeouts
    setTimeout(() => {
      top.value = withTiming(hiddenToastTop, { duration: 500 });
    }, 3000);
    setTimeout(() => {
      onRemoveToast(toast.id);
    }, 3500);
  }, []);

  const getColor = (type: ToastType) => {
    switch (type) {
      case ToastType.SUCCESS:
        return Colors[themeMode].success;
      case ToastType.ERROR:
        return Colors[themeMode].error;
      case ToastType.WARNING:
        return Colors[themeMode].warning;
      default:
        return Colors[themeMode].light;
    }
  };

  return (
    <Animated.View
      key={`toast_${index}`}
      style={{
        position: "absolute",
        width: "100%",
        left: left,
        top: top,
        backgroundColor: Colors[themeMode].background,
        borderWidth: 0,
        borderRadius: theme.borderRadius.card,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderLeftColor: getColor(toast.type),
        borderLeftWidth: 10,
        shadowColor: "white",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
      }}
    >
      <Text
        style={{
          color: Colors[themeMode].text,
          fontSize: theme.typography.h6,
          fontWeight: "bold",
        }}
      >
        {toast.title}
      </Text>
      <Text style={{ color: Colors[themeMode].text }}>{toast.description}</Text>
    </Animated.View>
  );
}

export default function Toast() {
  const themeMode = useColorScheme() as ThemeMode;
  const { toasts, onRemoveToast } = useContext(ToastContext);

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        paddingHorizontal: 16,
        marginTop: 0,
        zIndex: 10,
        backgroundColor: "blue",
        width: "100%",
      }}
    >
      <Text style={{ color: "white" }}>{toasts.length}</Text>
      {toasts.map((toast, index) => (
        <ToastCard key={toast.id} toast={toast} index={index} />
      ))}
    </View>
  );
}
