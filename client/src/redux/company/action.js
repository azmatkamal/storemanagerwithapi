import axios from "axios";
import {
  GET_COMPANY_PROFILES,
  GET_COMPANY_PROFILE,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "../types";

export const markcompany = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .post("/api/v1/company/markcompany", data)
    .then((res) => {
      loading();
      dispatch(getCompanys(loading));
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

export const selectcompany = (Country) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({
    type: GET_COMPANY_PROFILE,
    payload: Country,
  });
};

export const getCompanys = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/company")
    .then((res) => {
      dispatch({
        type: GET_COMPANY_PROFILES,
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

export const addorUpdateCompany = (
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
    req = axios.put("/api/v1/company", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    req = axios.post("/api/v1/company", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  req
    .then((res) => {
      loading();
      hideModal();
      dispatch(getCompanys(tblLoading));
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
