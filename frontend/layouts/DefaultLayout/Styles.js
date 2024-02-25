import { Dimensions, StyleSheet } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    height: SCREEN_HEIGHT - 80,
    justifyContent: "flex-end",
  },
  children: {
    padding: 12,
    flex: 1,
  },
});
