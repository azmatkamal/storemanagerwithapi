import { GET_NATIONALITIES, GET_NATIONALITY } from "../types";

const initialState = {
  nationality: {},
  nationalities: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NATIONALITIES:
      return {
        ...state,
        nationalities: action.payload,
      };
    case GET_NATIONALITY:
      return {
        ...state,
        nationality: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
