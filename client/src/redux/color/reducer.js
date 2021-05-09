import { GET_COLORS, GET_COLOR } from "../types";

const initialState = {
  color: {},
  colors: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    case GET_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
