import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 120,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  avatarContainer: {
    container: { margin: 0, opacity: 1 },
  },
  avatar: {
    objectFit: "cover",
    width: 100,
    height: 100,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "#0c56d0",
  },
  logoutBtn: { container: { position: "absolute", right: 0 } },
  roleView: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "flex-end",
  },
  roleLabel: { fontSize: 20, marginHorizontal: 16 },
  dropdown: {
    dropdownContainer: {
      height: 48,
      width: 240,
      borderColor: "#000",
    },
  },
});
