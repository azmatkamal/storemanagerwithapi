import { GET_MAIN_ADS, GET_MAIN_AD } from "../types";

const initialState = {
  ad: {},
  ads: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_ADS:
      return {
        ...state,
        ads: action.payload,
      };
    case GET_MAIN_AD:
      return {
        ...state,
        ad: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
