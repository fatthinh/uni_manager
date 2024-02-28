import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";
import { authAPIWithoutParams, endpoints } from "../../configs/API";

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const loginData = {
      username: username,
      password: password,
      client_id: "sUYm05pqwc4rgK9HK9CfUmpsuRCBGrJB3sUewYxg",
      client_secret:
        "Or57NqVjfOCETvgdTPqUfTqHQKDgM1AVKQEiyq7EJISUWD9O82wMAmUB1Oy9hXCL35maFD24fLou5gHwGm16Wh9ONbad9Q697RCoVoy7x4L8vISUQBJEifds2aFxdy2I",
      grant_type: "password",
    };

    const { data } = await axios.post(
      "http://192.168.1.42:8000/o/token/",
      loginData
    );

    await AsyncStorage.setItem("access-token", data.access_token);

    let user = await authAPIWithoutParams(data.access_token).get(
      endpoints.currentUser
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: user.data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem("access-token");
  dispatch({ type: USER_LOGOUT });
};
