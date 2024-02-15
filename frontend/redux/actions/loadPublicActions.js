import API, { endpoints } from "../../configs/API";
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

export const loadStudentsName = () => async (dispatch) => {
  dispatch({ type: LOAD_STUDENTS_NAME_REQUEST });
  try {
    let role = "student";
    let response = await API.get(`${endpoints.publicUsers}?filter=${role}`);

    let transformData = response.data.map((user) => ({
      label: user.get_full_name,
      value: user.id,
    }));

    dispatch({ type: LOAD_STUDENTS_NAME_SUCCESS, payload: transformData });
  } catch (error) {
    dispatch({
      type: LOAD_STUDENTS_NAME_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const loadLecturersName = () => async (dispatch) => {
  dispatch({ type: LOAD_LECTURERS_NAME_REQUEST });
  try {
    let role = "lecturer";
    let response = await API.get(`${endpoints.publicUsers}?filter=${role}`);

    let transformData = response.data.map((user) => ({
      label: user.get_full_name,
      value: user.id,
    }));

    dispatch({ type: LOAD_LECTURERS_NAME_SUCCESS, payload: transformData });
  } catch (error) {
    dispatch({
      type: LOAD_LECTURERS_NAME_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const loadCouncilsName = () => async (dispatch) => {
  dispatch({ type: LOAD_COUNCILS_NAME_REQUEST });
  try {
    let response = await API.get(endpoints.publicCouncils);

    let transformData = response.data.map((council) => ({
      label: council.name,
      value: council.id,
    }));

    dispatch({ type: LOAD_COUNCILS_NAME_SUCCESS, payload: transformData });
  } catch (error) {
    dispatch({
      type: LOAD_COUNCILS_NAME_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
