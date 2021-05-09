import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const markproduct = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/product/markproduct", data)
    .then((res) => {
      loading();
      dispatch(getProducts(loading));
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

export const selectproduct = (product) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_PRODUCT,
    payload: product,
  });
};

export const getProducts = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/product")
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
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

export const uploadImg = (data) => async (dispatch) => {
  const res = await axios.post("/api/v1/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const addorUpdateProduct = (
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
    req = axios.put("/api/v1/product", data);
  } else {
    req = axios.post("/api/v1/product", data);
  }

  req
    .then((res) => {
      loading();
      hideModal();
      dispatch(getProducts(tblLoading));
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
