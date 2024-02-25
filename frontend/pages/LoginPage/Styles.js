import { StyleSheet, Dimensions, View } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export const Line = () => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: "#d9d9d9",
        width: SCREEN_WIDTH - 16,
        marginBottom: 8,
      }}
    />
  );
};

export default StyleSheet.create({
  container: {
    display: "flex",
    height: SCREEN_HEIGHT + 120,
    backgroundColor: "#0c56d0",
    padding: 8,
  },
  header: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 32,
  },
  form: {
    flex: 6,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    borderRadius: 24,
    width: SCREEN_WIDTH - 16,
    textAlign: "left",
    paddingTop: 8,
    paddingBottom: 8,
  },
  textColor: {
    color: "#d9d9d9",
  },
  button: {
    width: 320,
    backgroundColor: "#d8e2f3",
    opacity: 0.8,
    color: "#000",
    borderRadius: 22,
  },
  buttonText: {
    fontSize: 22,
    padding: 12,
    textAlign: "center",
  },
});
