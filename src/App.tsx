import React from "react";
import Routes from "./routes";
import configureAppStore from "./redux/store";
import { saveState } from "./redux/localStorage";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "theme-ui";
import { Provider } from "react-redux";
import theme from "./theme";
import { Router } from "react-router-dom";
import UserContextProvider from "./services/userContext";
import ExamContextProvider from "./services/examContext";

export const history = createBrowserHistory();
export const store = configureAppStore();

store.subscribe(() => {
  saveState(store.getState());
});

const App = () => (
  <div className="App">
    <Provider store={store}>
      <UserContextProvider>
        <ExamContextProvider>
          <Router history={history}>
            <ThemeProvider theme={theme}>
              <Routes />
            </ThemeProvider>
          </Router>
        </ExamContextProvider>
      </UserContextProvider>
    </Provider>
  </div>
);

export default App;
