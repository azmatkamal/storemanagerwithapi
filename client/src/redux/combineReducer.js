import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import alertReducer from "./alert-error/alertReducer";
import errorReducer from "./alert-error/errorReducer";
// import lovReducer from "./lov/reducer";
import UserReducer from "./users/reducer";
import countryReducer from "./country/reducer";
import cityReducer from "./city/reducer";
import districtReducer from "./district/reducer";
import permissionsReducer from "./permission/reducer";
import brandsReducer from "./brand/reducer";
import modelsReducer from "./model/reducer";
import servicesReducer from "./service/reducer";
import categorysReducer from "./category/reducer";
import subservicesReducer from "./subservice/reducer";
import pagesReducer from "./page/reducer";
import subcategorysReducer from "./subcategory/reducer";
import colorsReducer from "./color/reducer";
import companysReducer from "./company/reducer";
import productsReducer from "./product/reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  alerts: alertReducer,
  country: countryReducer,
  city: cityReducer,
  district: districtReducer,
  users: UserReducer,
  permission: permissionsReducer,
  brand: brandsReducer,
  subservice: subservicesReducer,
  category: categorysReducer,
  subcategory: subcategorysReducer,
  service: servicesReducer,
  model: modelsReducer,
  page: pagesReducer,
  color: colorsReducer,
  company: companysReducer,
  product: productsReducer,
});
