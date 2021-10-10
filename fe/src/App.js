import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "./constants/API";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInRoute,NonLoggedInRoute, AdminRoute } from "./helper/ProtectedRoute";
// PAGES //
import Admin from "./pages/Admin";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Verification from "./pages/Verification";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";

function App() {
  const userGlobal = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const userLocalStorage = localStorage.getItem("token_shutter");
  console.log(userGlobal.isLogin); // to conditioning mustLogedInRoute

  //KEEP LOGIN CHECKER
  const keepLogin = () => {
    if (userLocalStorage) {
      axios.patch(`${API_URL}/users/`,{},{ headers: { authorization: `Bearer ${userLocalStorage}`}})
        .then((res) => {
          console.log(res.data);
          delete res.data[0].password;
          dispatch({
            type: "USER_LOGIN",
            payload: res.data[0],
          });
          dispatch({
            type: "USER_CHECK_LOGIN",
            payload: true,
          });
          console.log(userGlobal.isLogin);
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
      <Route component={ProductsList} path="/product-list" />
      <Route component={ProductDetail} path="/product-detail/:idProduct" />
      <Route component={Verification} path="/verification/:token" />
      <Route component={ForgotPassword} path="/forgot-password" />
      <Route component={ResetPassword} path="/reset-password/:id/:token" />
      <Route component={Home} path="/" exact />
      {/* Protected Route */}
      <LoggedInRoute path="/profile" component={Profile} isLogin={userGlobal.isLogin}/>
      <LoggedInRoute path="/cart" component={Cart} isLogin={userGlobal.isLogin}/>
      <NonLoggedInRoute path="/authentication" component={Auth} isLogin={userGlobal.isLogin} />
      <AdminRoute path="/admin" component={Admin} isAdmin={userGlobal.idRole} />
    </BrowserRouter>
  );
}

export default App;
