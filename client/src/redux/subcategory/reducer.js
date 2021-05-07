import { GET_SUB_CATEGORYS, GET_SUB_CATEGORY } from "../types";

const initialState = {
  subcategory: {},
  subcategorys: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB_CATEGORYS:
      return {
        ...state,
        subcategorys: action.payload,
      };
    case GET_SUB_CATEGORY:
      return {
        ...state,
        subcategory: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
