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
    >
      <ModalContent style={{ zIndex: 1000000 }}>{content}</ModalContent>
    </Modal>
  );
}

export default ModalComponent;
