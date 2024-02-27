import { Dimensions, StyleSheet } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    height: SCREEN_HEIGHT,
    justifyContent: "flex-end",
  },
  children: {
    padding: 12,
    flex: 1,
  },
});
