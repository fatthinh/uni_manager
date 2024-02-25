import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import ButtonComponent from "../ButtonComponent";

function ModalComponent({ visible, unVisible, content, title }) {
  return (
    <Modal
      visible={visible}
      swipeDirection={["down"]} // can be string or an array
      swipeThreshold={200} // default 100
      onSwipeOut={unVisible}
      modalAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      modalTitle={
        <ModalTitle
          title={title.toUpperCase()}
          style={{
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
        />
      }
      footer={
        <ModalFooter style={{ justifyContent: "center" }}>
          <ButtonComponent
            style={{
              children: { marginHorizontal: 0 },
            }}
            onClick={unVisible}
          >
            <FontAwesomeIcon icon={faAngleDoubleDown} />
          </ButtonComponent>
        </ModalFooter>
      }
    >
      <ModalContent style={{ zIndex: 1000000 }}>{content}</ModalContent>
    </Modal>
  );
}

export default ModalComponent;
