import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "./constants/API";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LoggedInRoute,
  NonLoggedInRoute,
  AdminRoute,
  AdminNonLoggedRoute,
  HomePageUser
} from "./helper/ProtectedRoute";

// PAGES //
import Admin from "./pages/Admin";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import WarehouseList from "./pages/WarehouseList";
import AddWarehouse from "./pages/AddWarehouse";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Verification from "./pages/Verification";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import AdminProductList from "./pages/AdminProductList";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import WarehouseStock from "./pages/WarehouseStock"
import Checkout from "./pages/Checkout";

function App() {
  const userGlobal = useSelector((state) => state.users);
  const adminGlobal = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const userLocalStorage = localStorage.getItem("token_shutter");

  //KEEP LOGIN CHECKER
  const keepLogin = () => {
    if (userLocalStorage) {
      axios
        .post(
          `${API_URL}/users/`,
          {},
          {
            headers: {
              authorization: `Bearer ${userLocalStorage}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.idRole);
          delete res.data.password;
          if (res.data.idRole == 1) {
            dispatch({
              type: "ADMIN_CHECK_LOGIN",
              payload: res.data,
            });
            return;
          } else if (res.data.idRole == 2) {
            dispatch({
              type: "ADMIN_CHECK_LOGIN",
              payload: res.data,
            });
            return;
          } else {
            dispatch({
              type: "USER_CHECK_LOGIN",
              payload: res.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      //GET CART 
      axios
        .post(
          `http://localhost:3001/cart/`,
          {},
          {
            headers: {
              authorization: `Bearer ${userLocalStorage}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.results);
          dispatch({
            type: "GET_CART",
            payload: res.data.results,
          });
          // dispatch({
          //   type: "USER_CHECK_LOGIN",
          //   payload: true,
          // });
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post(
          `${API_URL}/address/`,
          {},
          {
            headers: {
              authorization: `Bearer ${userLocalStorage}`,
            },
          }
        )
        .then((res) => {
          delete res.data.password;
          dispatch({
            type: "GET_ADDRESS",
            payload: res.data,
          });
          // dispatch({
          //   type: "USER_CHECK_LOGIN",
          //   payload: true,
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <BrowserRouter>
      {/* <Route component={AddProduct} path="/add-product" /> */}
      {/* <Route component={AdminEditProduct} path="/edit-product/:idProduct" /> */}
      {/* <Route component={AdminProductList} path="/admin-product-list" /> */}
      <Route component={WarehouseList} path="/warehouse-list" />
      <Route component={AddWarehouse} path="/add-warehouse" />
      {/* <Route component={ChangePassword} path="/change-password" /> */}
      {/* <Route component={Address} path="/address" /> */}
      <Route component={ProductsList} path="/product-list" />
      <Route component={ProductDetail} path="/product-detail/:idProduct" />
      <Route component={Verification} path="/verification/:token" />
      <Route component={ForgotPassword} path="/forgot-password" />
      <Route component={ResetPassword} path="/reset-password/:id/:token" />
      <Route component={Checkout} path="/checkout" />
      <HomePageUser component={Home} path="/" isAdmin={adminGlobal.idRole} exact />
    {/* Protected Route */}
      <NonLoggedInRoute path="/authentication" component={Auth} isLogin={userGlobal.isLogin}/>
      <LoggedInRoute path="/address"  component={Address}  isLogin={userGlobal.isLogin} exact/>
      <LoggedInRoute path="/change-password" component={ChangePassword} isLogin={userGlobal.isLogin} exact />
      <LoggedInRoute path="/profile"  component={Profile}  isLogin={userGlobal.isLogin} exact/>
      <LoggedInRoute path="/cart" component={Cart} isLogin={userGlobal.isLogin}/>
    {/* ADMIN */}
      <AdminNonLoggedRoute path="/auth-admin" component={Auth} isLogin={adminGlobal.isLogin}/>
      <AdminRoute path="/admin" component={Admin} isAdmin={adminGlobal.idRole} />
      <AdminRoute path="/add-product" component={AddProduct} isAdmin={adminGlobal.idRole} />
      <AdminRoute path="/edit-product/:idProduct" component={AdminEditProduct} isAdmin={adminGlobal.idRole} />
      <AdminRoute path="/admin-product-list" component={AdminProductList} isAdmin={adminGlobal.idRole} />
      <AdminRoute path="/admin-warehouse" component={WarehouseStock} isAdmin={adminGlobal.idRole} />
    </BrowserRouter>
  );
}

export default App;
