import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

function DropdownComponent({
  data,
  value,
  onChange,
  disabled,
  style: customStyles,
}) {
  return (
    <View
      style={[
        styles.dropdownContainer,
        customStyles && customStyles.dropdownContainer,
      ]}
    >
      <Dropdown
        style={[styles.dropdown, , customStyles && customStyles.dropdown]}
        selectedTextStyle={styles.textStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        itemTextStyle={styles.textStyle}
        labelField="label"
        valueField="value"
        value={value}
        placeholder={
          value ? data.find((item) => item.value === value)?.label : "Chọn..."
        }
        onChange={(item) => onChange(item.value)}
        search={data.length > 5}
        searchPlaceholder="Search..."
        disable={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    width: 200,
    borderColor: "#000",
    borderWidth: 0.5,
    borderRadius: 8,
  },
  dropdown: {
    height: 46,
    paddingHorizontal: 8,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default DropdownComponent;
