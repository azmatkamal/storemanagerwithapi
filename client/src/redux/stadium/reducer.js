import { GET_STADIUMS, GET_STADIUM } from "../types";

const initialState = {
  stadium: {},
  stadiums: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STADIUMS:
      return {
        ...state,
        stadiums: action.payload,
      };
    case GET_STADIUM:
      return {
        ...state,
        stadium: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
