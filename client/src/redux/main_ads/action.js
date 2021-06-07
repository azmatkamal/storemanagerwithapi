import axios from "axios";
import {
  GET_MAIN_ADS,
  GET_MAIN_AD,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const markad = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/ad/markad", data)
    .then((res) => {
      loading();
      dispatch(getAds(loading));
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

export const selectAd = (Country) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_MAIN_AD,
    payload: Country,
  });
};

export const getAds = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/ad")
    .then((res) => {
      dispatch({
        type: GET_MAIN_ADS,
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

export const addorUpdateAd = (
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
    req = axios.put("/api/v1/ad", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    req = axios.post("/api/v1/ad", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  req
    .then((res) => {
      loading();
      hideModal();
      dispatch(getAds(tblLoading));
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
