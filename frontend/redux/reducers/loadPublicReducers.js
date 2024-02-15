import {
  LOAD_COUNCILS_NAME_FAIL,
  LOAD_COUNCILS_NAME_REQUEST,
  LOAD_COUNCILS_NAME_SUCCESS,
  LOAD_LECTURERS_NAME_FAIL,
  LOAD_LECTURERS_NAME_REQUEST,
  LOAD_LECTURERS_NAME_SUCCESS,
  LOAD_STUDENTS_NAME_FAIL,
  LOAD_STUDENTS_NAME_REQUEST,
  LOAD_STUDENTS_NAME_SUCCESS,
} from "../constants/loadPublicConstants";

export const loadStudentsNameReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case LOAD_STUDENTS_NAME_REQUEST:
      return { students: [] };
    case LOAD_STUDENTS_NAME_SUCCESS:
      return { students: action.payload };
    case LOAD_STUDENTS_NAME_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

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

export const loadCouncilsNameReducer = (state = { councils: [] }, action) => {
  switch (action.type) {
    case LOAD_COUNCILS_NAME_REQUEST:
      return { councils: [] };
    case LOAD_COUNCILS_NAME_SUCCESS:
      return { councils: action.payload };
    case LOAD_COUNCILS_NAME_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
