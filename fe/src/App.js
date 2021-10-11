import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const userGlobal = useSelector((state) => state.users);
  const { idUser, isUpload } = userGlobal;
  const dispatch = useDispatch();
  const [idUserActive, setIdUserActive] = useState(idUser);

  useEffect(() => {
    setIdUserActive(idUser);
    const userLocalStorage = localStorage.getItem("token_shutter");

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
            type: "USER_LOGIN",
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isUpload]);

  return (
    <BrowserRouter>
      <Switch>
        <Route component={ProductsList} path="/product-list" />
        <Route component={ProductDetail} path="/product-detail/:idProduct" />
        <Route component={AddProduct} path="/add-product" />
        <Route component={AdminEditProduct} path="/edit-product/:idProduct" />
        <Route component={AdminProductList} path="/admin-product-list" />
        <Route component={Auth} path="/authentication" />
        <Route component={Verification} path="/verification/:token" />
        <Route component={ChangePassword} path="/profile/change-password" />
        <Route component={Address} path="/profile/address" />
        <Route component={Profile} path="/profile" />
        <Route component={Home} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
