import { CLOSE_SEARCH_MODAL, OPEN_SEARCH_MODAL } from "../constants/modals";

export const openSearchReducer = (state = { visible: false }, action) => {
  switch (action.type) {
    case OPEN_SEARCH_MODAL:
      return {
        visible: true,
        filter: action.filter,
        onClickItem: action.onClickItem,
      };
    case CLOSE_SEARCH_MODAL:
      return { visible: false };
    default:
      return state;
  }
};
