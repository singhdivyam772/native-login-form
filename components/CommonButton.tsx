import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CommonButtonProps {
  title: string;
  onPress: () => void;
}

const CommonButton: React.FC<CommonButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.button}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0A5EB0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  text: {
    color: "white",
    fontWeight: "bold",
  },
});
