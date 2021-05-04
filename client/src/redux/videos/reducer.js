import { GET_VIDEOS, GET_VIDEO } from "../types";

const initialState = {
  video: {},
  videos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
      };
    case GET_VIDEO:
      return {
        ...state,
        video: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
