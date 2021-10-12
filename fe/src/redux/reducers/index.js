import { combineReducers } from "redux";
import productReducer from "./products";
import userReducer from "./users";
import addressesReducer from "./addresses";
import adminReducer from "./admins"

export default combineReducers({
  product: productReducer,
  users: userReducer,
  addresses: addressesReducer,
  admins: adminReducer
});
