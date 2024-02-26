import {
  CLOSE_REMOVE_MODAL,
  CLOSE_SEARCH_MODAL,
  OPEN_REMOVE_MODAL,
  OPEN_SEARCH_MODAL,
} from "../constants/modalConstants";

export const searchReducer = (state = { visible: false }, action) => {
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

export const removeReducer = (state = { visible: false }, action) => {
  switch (action.type) {
    case OPEN_REMOVE_MODAL:
      return {
        visible: true,
        onRemove: action.onRemove,
      };
    case CLOSE_REMOVE_MODAL:
      return { visible: false };
    default:
      return state;
  }
};
