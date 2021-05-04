import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
} from "../types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/v1/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get User Token
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({
    type: CLEAR_ALERTS,
    payload: {},
  });
  dispatch({
    type: CLEAR_ERRORS,
    payload: {},
  });

  axios
    .post("/api/v1/users/login", userData)
    .then((res) => {
      const { data } = res;
      if (data) {
        const { token } = data;
        localStorage.setItem("TeamsAuth", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("TeamsAuth");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push("/login");
};
