import { GET_CATEGORYS, GET_CATEGORY } from "../types";

const initialState = {
  category: {},
  categorys: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORYS:
      return {
        ...state,
        categorys: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
