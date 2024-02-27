import {
  CLOSE_SEARCH_MODAL,
  OPEN_SEARCH_MODAL,
} from "../constants/modalConstants";

export const openSearchModal = (filter, onClickItem) => (dispatch) => {
  dispatch({
    type: OPEN_SEARCH_MODAL,
    filter: filter,
    onClickItem: onClickItem,
  });
};

export const closeSearchModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_SEARCH_MODAL,
  });
};
