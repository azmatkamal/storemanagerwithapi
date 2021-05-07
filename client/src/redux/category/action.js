import axios from "axios";
import {
  GET_CATEGORYS,
  GET_CATEGORY,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const markgategory = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/category/markgategory", data)
    .then((res) => {
      loading();
      dispatch(getCategories(loading));
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

export const selectCategory = (brand) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_CATEGORY,
    payload: brand,
  });
};

export const getCategories = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/category")
    .then((res) => {
      dispatch({
        type: GET_CATEGORYS,
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

export const addorUpdateCategory = (
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
    req = axios.put("/api/v1/category", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    req = axios.post("/api/v1/category", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  req
    .then((res) => {
      loading();
      hideModal();
      dispatch(getCategories(tblLoading));
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
