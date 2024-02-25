import { Dimensions, StyleSheet } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  actions: { flexDirection: "row", justifyContent: "flex-end" },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    height: 60,
    marginTop: 20,
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    width: (SCREEN_WIDTH - 24) * 0.7,
    height: 46,
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  searchBox: {
    marginRight: 20,
    width: 200,
    fontSize: 16,
  },
  searchIconContainer: {
    // display: "none",
    position: "absolute",
    right: 0,
    padding: 10,
    opacity: 0.4,
  },
  searchIcon: {},
  label: {
    position: "absolute",
    backgroundColor: "#fff",
    left: 12,
    top: -12,
    zIndex: 999,
    paddingHorizontal: 4,
    fontSize: 14,
  },
  dropdown: {
    dropdownContainer: {
      width: (SCREEN_WIDTH - 24) * 0.35,
      height: 46,
      marginLeft: 8,
    },
  },
  usersHeader: {
    flexDirection: "row",
    marginTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 14,
    backgroundColor: "#0c56d0",
  },
  textStyle: {
    fontSize: 12,
  },
  usersContainer: {
    height: 430,
  },
});
