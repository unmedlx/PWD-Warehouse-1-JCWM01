import { combineReducers } from "redux";
import usersReducer from "./users";
import warehousesReducer from "./warehouses";
import addressesReducer from "./addresses";
import adminReducer from "./admins";
import cartsReducer from "./carts";
import addressWarehouseReducer from "./addressWarehouse";
import ongoingTransactionReducer from "./ongoingTransaction";
import detailTransactionReducer from "./detailTransaction";
import userstocksReducer from "./userstocks";
import cartReducer from "./cart";

export default combineReducers({
  users: usersReducer,
  addresses: addressesReducer,
  admins: adminReducer,
  warehouses: warehousesReducer,
  carts: cartsReducer,
  addressWarehouse: addressWarehouseReducer,
  ongoingTransaction: ongoingTransactionReducer,
  detailTransaction: detailTransactionReducer,
  cart: cartReducer,
  userstocks: userstocksReducer,
});
