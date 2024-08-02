import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Fixed import
import { Provider } from "react-redux";
import App from "./App/App";
import uiReducer, { initialState } from "./reducers/uiReducer";
import { Map } from "immutable";

const store = createStore(
  uiReducer,
  Map(initialState), // Ensure this is the right way to initialize the state
  applyMiddleware(thunk)
);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Updated for React 18

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
