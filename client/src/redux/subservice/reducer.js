import { GET_SUB_SERVICES, GET_SUB_SERVICE } from "../types";

const initialState = {
  subservice: {},
  subservices: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB_SERVICES:
      return {
        ...state,
        subservices: action.payload,
      };
    case GET_SUB_SERVICE:
      return {
        ...state,
        subservice: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
