import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import Root from "./Root";
import "semantic-ui-css/semantic.min.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
import RootStore from "./stores";

const roots = new RootStore();

ReactDOM.render(
  <Provider {... roots}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
