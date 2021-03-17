import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import myFilm from "./myFilm";
import film from "./film";
import category from "./category";

export default combineReducers({
  alert,
  auth,
  myFilm,
  film,
  category,
});
