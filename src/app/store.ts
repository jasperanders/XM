import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { stat } from "fs";
import { rootReducer } from "./reducers";

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
  });

  return store;
}
