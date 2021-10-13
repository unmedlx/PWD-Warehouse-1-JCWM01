// configureStore FOR REDUX PERSIST : keep redux state in localStorage
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

const persistConfig = {
  key: "root", //i dunno
  storage, //storage to save data
  whitelist: ["users", "admins"], // reducer that we want to keep
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

//The store
export let store = configureStore({ reducer: persistedReducer, devTools: true, });
//the persistor
export let persistor = persistStore(store);
