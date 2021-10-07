import { combineReducers } from "redux";
import usersReducer from "./users";
import addressesReducer from "./addresses";

export default combineReducers({
  users: usersReducer,
  addresses: addressesReducer
});
