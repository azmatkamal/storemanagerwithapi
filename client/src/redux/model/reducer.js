import { GET_MODELS, GET_MODEL } from "../types";

const initialState = {
  model: {},
  models: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODELS:
      return {
        ...state,
        models: action.payload,
      };
    case GET_MODEL:
      return {
        ...state,
        model: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
