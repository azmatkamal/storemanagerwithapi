import { GET_LEAD_SOURCES, GET_LEAD_TYPES } from "../types";

const initialState = {
  lead_sources: [],
  lead_types: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEAD_TYPES:
      return {
        ...state,
        lead_types: action.payload,
      };
    case GET_LEAD_SOURCES:
      return {
        ...state,
        lead_sources: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
