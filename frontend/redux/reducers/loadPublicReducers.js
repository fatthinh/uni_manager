import {
  LOAD_LECTURERS_NAME_FAIL,
  LOAD_LECTURERS_NAME_REQUEST,
  LOAD_LECTURERS_NAME_SUCCESS,
} from "../constants/loadPublicConstants";

export const loadLecturersNameReducer = (state = { lecturers: [] }, action) => {
  switch (action.type) {
    case LOAD_LECTURERS_NAME_REQUEST:
      return { lecturers: [] };
    case LOAD_LECTURERS_NAME_SUCCESS:
      return { lecturers: action.payload };
    case LOAD_LECTURERS_NAME_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
