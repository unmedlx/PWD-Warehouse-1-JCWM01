import React, { useState, useEffect } from "react"

import { BrowserRouter, Route, Switch } from "react-router-dom"
import ProductsList from "./pages/ProductsList"

export default function App() {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <Route component={ProductsList} path="/productList" />
        </Switch>
      </>
    </BrowserRouter>
  )
}
