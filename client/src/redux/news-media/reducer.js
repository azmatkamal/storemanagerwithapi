import { GET_NEWSMEDIALIST, GET_NEWSMEDIA } from "../types";

const initialState = {
  newsmedia: {},
  newsmedialist: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWSMEDIALIST:
      return {
        ...state,
        newsmedialist: action.payload,
      };
    case GET_NEWSMEDIA:
      return {
        ...state,
        newsmedia: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
