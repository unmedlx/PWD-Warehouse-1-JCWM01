import { combineReducers } from "redux";
import usersReducer from "./users";
import productReducer from "./products";
import addressesReducer from "./addresses";
import adminReducer from "./admins"

export default combineReducers({
  users: usersReducer,
  addresses: addressesReducer,
  admins: adminReducer,
  product: productReducer,
});
