import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
import RootStore from "./stores";

const roots = new RootStore();

ReactDOM.render(
  <Provider {... roots}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
