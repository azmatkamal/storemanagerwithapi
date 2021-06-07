import axios from "axios";
import {
  GET_NEWSLIST,
  GET_NEWS,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const marknews = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/news/marknews", data)
    .then((res) => {
      loading();
      dispatch(getNews(loading));
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

export const selectNews = (Country) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_NEWS,
    payload: Country,
  });
};

export const getNews = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/news")
    .then((res) => {
      dispatch({
        type: GET_NEWSLIST,
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

export const addorUpdateNews =
  (data, isCreate, loading, hideModal, tblLoading) => (dispatch) => {
    dispatch({ type: CLEAR_ALERTS });
    dispatch({ type: CLEAR_ERRORS });
    loading();

    let req;
    if (!isCreate) {
      req = axios.put("/api/v1/news", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      req = axios.post("/api/v1/news", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    req
      .then((res) => {
        loading();
        hideModal();
        dispatch(getNews(tblLoading));
      })
      .catch((err) => {
        console.log(err);
        loading();
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };
