import { CLOSE_REMOVE_MODAL, OPEN_REMOVE_MODAL } from "../constants/modals";

export const openRemoveModal = (onRemove) => (dispatch) => {
  dispatch({
    type: OPEN_REMOVE_MODAL,
    onRemove: onRemove,
  });
};

export const closeRemoveModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_REMOVE_MODAL,
  });
};
