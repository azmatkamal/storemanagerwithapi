import { GET_CITIES, GET_CITY } from "../types";

const initialState = {
  city: {},
  cities: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case GET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
