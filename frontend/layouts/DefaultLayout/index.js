import { Text, View } from "react-native";
import Styles from "./Styles";

function DefaultLayout({ children }) {
  return (
    <View style={Styles.container}>
      <View style={Styles.children}>{children}</View>
      <View style={Styles.footer}>
        <Text>this is footer</Text>
      </View>
    </View>
  );
}

export default DefaultLayout;
