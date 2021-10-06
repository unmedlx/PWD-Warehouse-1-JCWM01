import React, { useState, useEffect } from "react"

import { BrowserRouter, Route, Switch } from "react-router-dom"
import ProductsList from "./pages/ProductsList"
import ProductDetail from "./pages/ProductDetail"

export default function App() {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <Route component={ProductsList} path="/product-list" />
          <Route component={ProductDetail} path="/product-detail/:idProduct" />
        </Switch>
      </>
    </BrowserRouter>
  )
}
