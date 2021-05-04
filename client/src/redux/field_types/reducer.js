import { GET_FIELD_TYPES, GET_FIELD_TYPE } from "../types";

const initialState = {
  field: {},
  fields: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FIELD_TYPES:
      return {
        ...state,
        fields: action.payload,
      };
    case GET_FIELD_TYPE:
      return {
        ...state,
        field: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
