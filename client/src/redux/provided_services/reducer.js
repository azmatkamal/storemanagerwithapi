import { GET_PROVIDED_SERVICES, GET_PROVIDED_SERVICE } from "../types";

const initialState = {
  service: {},
  services: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROVIDED_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case GET_PROVIDED_SERVICE:
      return {
        ...state,
        service: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
