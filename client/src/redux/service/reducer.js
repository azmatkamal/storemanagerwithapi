import { GET_SERVICES, GET_SERVICE } from "../types";

const initialState = {
  service: {},
  services: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case GET_SERVICE:
      return {
        ...state,
        service: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
