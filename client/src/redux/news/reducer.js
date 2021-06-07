import { GET_NEWSLIST, GET_NEWS } from "../types";

const initialState = {
  news: {},
  newslist: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWSLIST:
      return {
        ...state,
        newslist: action.payload,
      };
    case GET_NEWS:
      return {
        ...state,
        news: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
