import axios from "axios";
import { GET_PAGE, CLEAR_ALERTS, CLEAR_ERRORS, GET_ERRORS } from "../types";

export const getPage = (loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();
  axios
    .get("/api/v1/page")
    .then((res) => {
      dispatch({
        type: GET_PAGE,
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

export const addorUpdatePage = (data, loading) => (dispatch) => {
  dispatch({ type: CLEAR_ALERTS });
  dispatch({ type: CLEAR_ERRORS });
  loading();

  let req;

  req = axios.put("/api/v1/page", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  req
    .then((res) => {
      dispatch(getPage(loading));
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
