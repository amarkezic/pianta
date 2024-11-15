import { createContext, ReactNode, useState } from "react";
import { Toast, ToastType } from "./Toast";
import * as Crypto from "expo-crypto";

type Props = {
  children: ReactNode;
};

type ToastStorage = {
  toasts: Toast[];
  onShowToast: (title: string, description: string, type: ToastType) => void;
  onRemoveToast: (id: string) => void;
};

export const ToastContext = createContext<ToastStorage>({
  toasts: [],
  onShowToast: () => {},
  onRemoveToast: () => {},
});

export function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const onShowToast = (title: string, description: string, type: ToastType) => {
    const newToast = {
      id: Crypto.randomUUID(),
      title,
      description,
      type,
    };
    if (toasts.length >= 3) {
      //TODO this should be better
      return;
    }

    setToasts([...toasts, newToast]);
  };

  const onRemoveToast = (id: string) => {
    setToasts((prevValue) => prevValue.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, onShowToast, onRemoveToast }}>
      {children}
    </ToastContext.Provider>
  );
}
