import { GET_SPECIAL_REQUESTS, GET_SPECIAL_REQUEST } from "../types";

const initialState = {
  special: {},
  specials: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPECIAL_REQUESTS:
      return {
        ...state,
        specials: action.payload,
      };
    case GET_SPECIAL_REQUEST:
      return {
        ...state,
        special: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
