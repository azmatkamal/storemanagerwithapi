import axios from "axios";
import {
  GET_SUB_CATEGORYS,
  GET_SUB_CATEGORY,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const marksubcategory = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/subcategory/marksubcategory", data)
    .then((res) => {
      loading();
      dispatch(getSubCategories(loading));
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

export const selectSubcategory = (model) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_SUB_CATEGORY,
    payload: model,
  });
};

export const getSubCategories = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/subcategory")
    .then((res) => {
      dispatch({
        type: GET_SUB_CATEGORYS,
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

export const addorUpdateSubCategory = (
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
    req = axios.put("/api/v1/subcategory", data);
  } else {
    req = axios.post("/api/v1/subcategory", data);
  }

  req
    .then((res) => {
      loading();
      hideModal();
      dispatch(getSubCategories(tblLoading));
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
