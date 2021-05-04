import { GET_PERMISSIONS, GET_PERMISSION } from "../types";

const initialState = {
  permission: {},
  permissions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    case GET_PERMISSION:
      return {
        ...state,
        permission: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
