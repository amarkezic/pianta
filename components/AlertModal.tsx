import { Modal, Text } from "react-native";

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
};

export default function AlertModal({ isOpen, title, message }: Props) {
  return (
    <Modal animationType="slide" visible={isOpen}>
      <Text>{title}</Text>
      <Text>{message}</Text>
    </Modal>
  );
}
