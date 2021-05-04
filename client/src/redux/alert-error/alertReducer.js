import { GET_ALERTS, CLEAR_ALERTS } from "../types";

const initialState = {
  alerts: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALERTS:
      return {
        ...state,
        alerts: action.payload,
      };
    case CLEAR_ALERTS:
      return {
        ...state,
        alerts: {},
      };
    default:
      return state;
  }
};

export default reducer;
