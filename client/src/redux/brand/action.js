import axios from "axios";
import {
  GET_BRANDS,
  GET_BRAND,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const markbrand = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/brand/markbrand", data)
    .then((res) => {
      loading();
      dispatch(getBrands(loading));
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

export const selectBrand = (brand) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_BRAND,
    payload: brand,
  });
};

export const getBrands = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/brand")
    .then((res) => {
      dispatch({
        type: GET_BRANDS,
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

export const addorUpdateBrand = (
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
    req = axios.put("/api/v1/brand", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    req = axios.post("/api/v1/brand", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  req
    .then((res) => {
      loading();
      hideModal();
      dispatch(getBrands(tblLoading));
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
