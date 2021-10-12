import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "./constants/API";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LoggedInRoute,
  NonLoggedInRoute,
  AdminRoute,
} from "./helper/ProtectedRoute";

// PAGES //
import Admin from "./pages/Admin";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
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

function App() {
  const userGlobal = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const userLocalStorage = localStorage.getItem("token_shutter");

  //KEEP LOGIN CHECKER
  const keepLogin = () => {
    if (userLocalStorage) {
      axios
        .post(
          `http://localhost:3001/users/`,
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
            type: "USER_CHECK_LOGIN",
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post(
          `http://localhost:3001/address/`,
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
          dispatch({
            type: "USER_CHECK_LOGIN",
            payload: true,
          });
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
      <Route component={AddProduct} path="/add-product" />
      <Route component={AdminEditProduct} path="/edit-product/:idProduct" />
      <Route component={AdminProductList} path="/admin-product-list" />
      <Route component={ChangePassword} path="/change-password" />
      <Route component={Address} path="/address" />
      <Route component={ProductsList} path="/product-list" />
      <Route component={ProductDetail} path="/product-detail/:idProduct" />
      <Route component={Verification} path="/verification/:token" />
      <Route component={ForgotPassword} path="/forgot-password" />
      <Route component={ResetPassword} path="/reset-password/:id/:token" />
      <Route component={Home} path="/" exact />
      {/* Protected Route */}
      <LoggedInRoute
        path="/profile"
        component={Profile}
        isLogin={userGlobal.isLogin}
        exact
      />
      <LoggedInRoute
        path="/cart"
        component={Cart}
        isLogin={userGlobal.isLogin}
      />
      <NonLoggedInRoute
        path="/authentication"
        component={Auth}
        isLogin={userGlobal.isLogin}
      />
      <AdminRoute path="/admin" component={Admin} isAdmin={userGlobal.idRole} />
    </BrowserRouter>
  );
}

export default App;
