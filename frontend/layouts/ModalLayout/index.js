import { Dimensions, ScrollView, View } from "react-native";
import ModalComponent from "../../components/ModalComponent";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

function ModalLayout({ visible, unVisible, children, title }) {
  return (
    <ModalComponent
      visible={visible}
      unVisible={unVisible}
      content={
        <View
          style={{ width: SCREEN_WIDTH * 0.85, height: SCREEN_HEIGHT * 0.75 }}
        >
          {children}
        </View>
      }
      title={title}
    />
  );
}

export default ModalLayout;
