import ModalComponent from "./ModalComponent";
import { View } from "react-native";
import { closeRemoveModal } from "../redux/actions/removeModal";
import ButtonComponent from "./ButtonComponent";
import { useDispatch } from "react-redux";

function RemoveModal({ onRemove, visible }) {
  const dispatch = useDispatch();

  return (
    <ModalComponent
      content={
        <View
          style={{
            width: 240,
            height: 60,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ButtonComponent
            primary
            style={{
              container: { backgroundColor: "red", width: 120, height: 46 },
            }}
            onClick={onRemove}
          >
            Xóa?
          </ButtonComponent>
        </View>
      }
      title="Thông báo"
      visible={visible}
      unVisible={() => dispatch(closeRemoveModal())}
    />
  );
}

export default RemoveModal;
