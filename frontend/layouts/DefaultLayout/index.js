import { ScrollView, Text, View } from "react-native";
import Styles from "./Styles";

function DefaultLayout({ children }) {
  return (
    <View style={Styles.container}>
      <View style={Styles.children}>{children}</View>
    </View>
  );
}

export default DefaultLayout;
