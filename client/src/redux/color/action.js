import axios from "axios";
import {
  GET_COLORS,
  GET_COLOR,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const markcolor = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/color/markcolor", data)
    .then((res) => {
      loading();
      dispatch(getColors(loading));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      loading();
    });
};

export const selectcolor = (Country) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_COLOR,
    payload: Country,
  });
};

export const getColors = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/color")
    .then((res) => {
      dispatch({
        type: GET_COLORS,
        payload: res.data,
      });
      loading();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      loading();
    });
};

export const addorUpdateCOlor = (
  data,
  isCreate,
  loading,
  hideModal,
  tblLoading
) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();

  let req;
  if (!isCreate) {
    req = axios.put("/api/v1/color", data);
  } else {
    req = axios.post("/api/v1/color", data);
  }

  req
    .then((res) => {
      loading();
      hideModal();
      dispatch(getColors(tblLoading));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      loading();
    });
};
