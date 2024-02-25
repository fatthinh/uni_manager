import { text } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import useDebounce from "../../hooks/useDebounce";

function InputBox({
  label,
  value,
  onChange = () => {},
  style: customStyles,
  icon,
  removeIcon = false,
  password,
  disabled,
  multiline,
  keyboardType,
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const debounceValue = useDebounce(tempValue, 500);

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleClearInput = () => {
    setTempValue("");
  };

  return (
    <>
      <View
        style={[
          inputStyles.inputBox,
          { borderColor: isFocus ? "blue" : "#000" },
          customStyles && customStyles.inputBox,
        ]}
      >
        {(value || isFocus) && (
          <Text
            style={[
              inputStyles.label,
              isFocus && { color: "blue" },
              customStyles && customStyles.label,
            ]}
          >
            {label}
          </Text>
        )}
        <TextInput
          style={[
            inputStyles.input,
            customStyles && customStyles.input,
            disabled && { color: "#000" },
          ]}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder={isFocus ? "" : label}
          value={tempValue}
          onChangeText={(text) => setTempValue(text)}
          secureTextEntry={password}
          editable={!disabled}
          multiline={multiline}
          keyboardType={keyboardType}
        />
        {icon ? (
          <TouchableOpacity
            style={[inputStyles.icon, !tempValue && { display: "none" }]}
            onPress={removeIcon && handleClearInput}
          >
            {icon}
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </>
  );
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const inputStyles = StyleSheet.create({
  inputBox: {
    position: "relative",
    width: SCREEN_WIDTH - 48,
    height: 46,
    borderColor: "#000",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 16,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    width: "90%",
  },
  label: {
    position: "absolute",
    backgroundColor: "#fff",
    left: 12,
    top: -12,
    zIndex: 999,
    paddingHorizontal: 4,
    fontSize: 18,
  },
  icon: {
    position: "absolute",
    right: 0,
    padding: 10,
    opacity: 0.6,
  },
});

export default InputBox;
