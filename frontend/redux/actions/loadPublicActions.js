import API, { endpoints } from "../../configs/API";
import {
  LOAD_LECTURERS_NAME_FAIL,
  LOAD_LECTURERS_NAME_REQUEST,
  LOAD_LECTURERS_NAME_SUCCESS,
} from "../constants/loadPublicConstants";

export const loadLecturersName = () => async (dispatch) => {
  dispatch({ type: LOAD_LECTURERS_NAME_REQUEST });
  try {
    let role = "lecturer";
    let response = await API.get(`${endpoints.publicUsers}?filter=${role}`);

    let transformData = response.data.results.map((user) => ({
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
