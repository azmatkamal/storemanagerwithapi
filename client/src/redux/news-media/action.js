import axios from "axios";
import {
  GET_NEWSMEDIALIST,
  GET_NEWSMEDIA,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const markmedia = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/newsmedia/markmedia", data)
    .then((res) => {
      loading();
      dispatch(getMedias(loading));
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

export const selectMedia = (media) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_NEWSMEDIA,
    payload: media,
  });
};

export const getMedias = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/newsmedia")
    .then((res) => {
      dispatch({
        type: GET_NEWSMEDIALIST,
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

export const addorUpdateMedia =
  (data, isCreate, loading, hideModal, tblLoading) => (dispatch) => {
    dispatch({ type: CLEAR_ALERTS });
    dispatch({ type: CLEAR_ERRORS });
    loading();

    let req;
    if (!isCreate) {
      req = axios.put("/api/v1/newsmedia", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      req = axios.post("/api/v1/newsmedia", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    req
      .then((res) => {
        loading();
        hideModal();
        dispatch(getMedias(tblLoading));
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
