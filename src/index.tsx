import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { HashRouter } from "react-router-dom";
import App from "./components/App";
import GlobalStyles from "./globalStyles";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("example")
);
