import { GET_PAGE } from "../types";

const initialState = {
  page: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
