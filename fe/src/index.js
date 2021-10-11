import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import rootReducer from "./redux/reducers";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/configureStore"; //Redux Persist : to keep state after reload
import { PersistGate } from "redux-persist/integration/react";
// import { configureStore } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: rootReducer,
//   devTools: true,
// });

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
