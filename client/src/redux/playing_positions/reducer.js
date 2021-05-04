import { GET_PLAYING_POSITIONS, GET_PLAYING_POSITION } from "../types";

const initialState = {
  play: {},
  plays: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYING_POSITIONS:
      return {
        ...state,
        plays: action.payload,
      };
    case GET_PLAYING_POSITION:
      return {
        ...state,
        play: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
