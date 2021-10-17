import { combineReducers } from "redux";
import usersReducer from "./users";
import productReducer from "./products";
import addressesReducer from "./addresses";
import adminReducer from "./admins"
import cartsReducer from "./carts";
import addressWarehouseReducer from "./addressWarehouse";
import ongoingTransactionReducer from "./ongoingTransaction";
import detailTransactionReducer from "./detailTransaction";

export default combineReducers({
  users: usersReducer,
  addresses: addressesReducer,
  admins: adminReducer,
  product: productReducer,
  carts: cartsReducer,
  addressWarehouse: addressWarehouseReducer,
  ongoingTransaction: ongoingTransactionReducer,
  detailTransaction: detailTransactionReducer
});
