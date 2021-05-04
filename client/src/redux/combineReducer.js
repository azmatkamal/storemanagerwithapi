import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import alertReducer from "./alert-error/alertReducer";
import errorReducer from "./alert-error/errorReducer";
// import lovReducer from "./lov/reducer";
import UserReducer from "./users/reducer";
import countryReducer from "./country/reducer";
import cityReducer from "./city/reducer";
import districtReducer from "./district/reducer";
import nationalityReducer from "./nationality/reducer";
import fieldReducer from "./field_types/reducer";
import gameReducer from "./game_types/reducer";
import specialReducer from "./special_requests/reducer";
import playReducer from "./playing_positions/reducer";
import adReducer from "./main_ads/reducer";
import serviceReducer from "./provided_services/reducer";
import stadiumReducer from "./stadium/reducer";
import videosReducer from "./videos/reducer";
import pagesReducer from "./page/reducer";
import permissionsReducer from "./permission/reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  alerts: alertReducer,
  country: countryReducer,
  city: cityReducer,
  district: districtReducer,
  nationality: nationalityReducer,
  field: fieldReducer,
  game: gameReducer,
  special: specialReducer,
  play: playReducer,
  ad: adReducer,
  service: serviceReducer,
  stadium: stadiumReducer,
  video: videosReducer,
  page: pagesReducer,
  users: UserReducer,
  permission: permissionsReducer,
});
