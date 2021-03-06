import axios from "axios";
import {
  GET_SERVICES,
  GET_SERVICE,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const markservice = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/service/markservice", data)
    .then((res) => {
      loading();
      dispatch(getServices(loading));
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

export const selectService = (brand) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_SERVICE,
    payload: brand,
  });
};

export const getServices = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/service")
    .then((res) => {
      dispatch({
        type: GET_SERVICES,
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

export const addorUpdateService =
  (data, isCreate, loading, hideModal, tblLoading) => (dispatch) => {
    dispatch({ type: CLEAR_ALERTS });
    dispatch({ type: CLEAR_ERRORS });
    loading();

    let req;
    if (!isCreate) {
      req = axios.put("/api/v1/service", data);
    } else {
      req = axios.post("/api/v1/service", data);
    }

    req
      .then((res) => {
        loading();
        hideModal();
        dispatch(getServices(tblLoading));
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
