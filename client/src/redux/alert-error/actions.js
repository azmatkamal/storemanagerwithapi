import { CLEAR_ERRORS, CLEAR_ALERTS } from "../types";

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};

export const clearAlerts = () => dispatch => {
  dispatch({
    type: CLEAR_ALERTS
  });
};
