import { GET_GAME_TYPES, GET_GAME_TYPE } from "../types";

const initialState = {
  game: {},
  games: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_TYPES:
      return {
        ...state,
        games: action.payload,
      };
    case GET_GAME_TYPE:
      return {
        ...state,
        game: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
