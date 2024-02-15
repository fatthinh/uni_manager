import { Dimensions, StyleSheet } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#fff",
    height: SCREEN_HEIGHT - 80
  },
  children: {
    padding: 12,
    flex: 9
  },
  footer: {
    flex: 0.5,
    backgroundColor: "#0c56d0",
    justifyContent: "center",
    alignItems: "center",
  },
});
