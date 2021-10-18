import { combineReducers } from "redux";
import usersReducer from "./users";
import productReducer from "./products";
import addressesReducer from "./addresses";
import adminReducer from "./admins";
import cartsReducer from "./carts";
import userstocksReducer from "./userstocks";
import cartReducer from "./cart";

export default combineReducers({
  users: usersReducer,
  addresses: addressesReducer,
  admins: adminReducer,
  product: productReducer,
  carts: cartsReducer,
  cart: cartReducer,
  userstocks: userstocksReducer,
});
