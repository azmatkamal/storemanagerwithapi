import { GET_DISTRICTS, GET_DISTRICT } from "../types";

const initialState = {
  district: {},
  districts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISTRICTS:
      return {
        ...state,
        districts: action.payload,
      };
    case GET_DISTRICT:
      return {
        ...state,
        district: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
