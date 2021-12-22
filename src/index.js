import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./redux/store";
import "./index.css";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <PersistGate loading={"Loading..."} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById("root")
);
