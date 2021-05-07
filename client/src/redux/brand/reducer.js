import { GET_BRANDS, GET_BRAND } from "../types";

const initialState = {
  brand: {},
  brands: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case GET_BRAND:
      return {
        ...state,
        brand: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
