import { combineReducers } from "redux";
import usersReducer from "./users";
import productReducer from "./products";
import addressesReducer from "./addresses";

export default combineReducers({
  users: usersReducer,
  addresses: addressesReducer,
  product: productReducer,
});
