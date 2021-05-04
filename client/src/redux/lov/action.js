import axios from "axios";

import {
  GET_LEAD_TYPES,
  GET_LEAD_SOURCES,
  CLEAR_ALERTS,
  CLEAR_ERRORS,
} from "../types";

export const getLeadSources = () => (dispatch) => {
  dispatch({
    type: CLEAR_ALERTS,
    payload: {},
  });
  dispatch({
    type: CLEAR_ERRORS,
    payload: {},
  });

  axios
    .get("/api/lov.php/sources")
    .then((res) => {
      const { data } = res.data;
      if (data) {
        dispatch({
          type: GET_LEAD_SOURCES,
          payload: data,
        });
      } else {
        dispatch({
          type: GET_LEAD_SOURCES,
          payload: [],
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_LEAD_SOURCES,
        payload: [],
      });
    });
};

export const getLeadTypes = () => (dispatch) => {
  dispatch({
    type: CLEAR_ALERTS,
    payload: {},
  });
  dispatch({
    type: CLEAR_ERRORS,
    payload: {},
  });

  axios
    .get("/api/lov.php/types")
    .then((res) => {
      const { data } = res.data;
      if (data) {
        dispatch({
          type: GET_LEAD_TYPES,
          payload: data,
        });
      } else {
        dispatch({
          type: GET_LEAD_TYPES,
          payload: [],
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_LEAD_TYPES,
        payload: [],
      });
    });
};
