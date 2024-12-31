import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface CommonTextInputProps extends TextInputProps {
  icon?: string;
  onIconPress?: () => void;
}

const CommonTextInput: React.FC<CommonTextInputProps> = ({
  icon,
  onIconPress,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container]}>
      <TextInput {...props} style={styles.input} />
      {icon && (
        <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
          <Icon name={icon} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,

    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 10,
  },
});
