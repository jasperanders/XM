import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { loadState } from "./localStorage";

export default function configureAppStore() {
  const hydrateState = loadState();
  console.log(hydrateState);
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    // preloadedState: hydrateState,
  });

  return store;
}
