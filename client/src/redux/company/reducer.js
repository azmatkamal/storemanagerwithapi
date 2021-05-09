import { GET_COMPANY_PROFILES, GET_COMPANY_PROFILE } from "../types";

const initialState = {
  company: {},
  companys: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY_PROFILE:
      return {
        ...state,
        company: action.payload,
      };
    case GET_COMPANY_PROFILES:
      return {
        ...state,
        companys: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
