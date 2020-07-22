import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureAppStore from "./redux/store";
import { saveState } from "./redux/localStorage";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import UserContextProvider from "./services/userContext";
import ExamContextProvider from "./services/examContext";

export const history = createBrowserHistory();
export const store = configureAppStore();

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <UserContextProvider> */}
      {/* <ExamContextProvider> */}
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
      {/* </ExamContextProvider> */}
      {/* </UserContextProvider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
