import { combineReducers } from "redux";
import productReducer from "./products";
import userReducer from "./users";

export default combineReducers({
  product: productReducer,
  user: userReducer,
});
