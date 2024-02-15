import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

function ButtonComponent({
  primary = false,
  outline = false,
  rounded = false,
  disabled = false,
  children,
  style: customStyles,
  leftIcon,
  rightIcon,
  onClick,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        primary && styles.primary,
        outline && styles.outline,
        rounded && styles.rounded,
        disabled && styles.disabled,
        customStyles && customStyles.container,
      ]}
      onPress={onClick}
      disabled={disabled}
    >
      {leftIcon && (
        <FontAwesomeIcon
          icon={leftIcon}
          style={[
            styles.icon,
            primary && { color: "#fff" },
            customStyles && customStyles.textColor,
          ]}
        />
      )}
      <Text
        style={[
          styles.children,
          primary && { color: "#fff" },
          customStyles && customStyles.textColor,
          customStyles && customStyles.children,
        ]}
      >
        {children}
      </Text>
      {rightIcon && (
        <FontAwesomeIcon
          icon={rightIcon}
          style={[
            styles.icon,
            primary && { color: "#fff" },
            customStyles && customStyles.textColor,
          ]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    maxHeight: 54,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    margin: 4,
  },
  children: { marginHorizontal: 4 },
  icon: {},
  primary: { backgroundColor: "#0c56d0" },
  outline: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#0c56d0" },
  rounded: { borderRadius: 1000, borderWidth: 1, borderColor: "#0c56d0" },
  disabled: { opacity: 0.6 },
  textColor: {
    color: "#000",
  },
});

export default ButtonComponent;
