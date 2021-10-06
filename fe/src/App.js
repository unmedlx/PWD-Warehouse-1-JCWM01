import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Verification from "./pages/Verification";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={ProductsList} path="/product-list" />
        <Route component={ProductDetail} path="/product-detail/:idProduct" />
        <Route component={Auth} path="/authentication" />
        <Route component={Verification} path="/verification/:token" />
        <Route component={Home} path="/" />
      </Switch>
    </BrowserRouter>
  );
}
