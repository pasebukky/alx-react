import React from "react";
import ReactDOM from "react-dom/client"; 
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; 
import { Provider } from "react-redux";
import App from "./App/App";
import uiReducer, { initialState } from "./reducers/uiReducer";
import { Map } from "immutable";

// Setup Redux DevTools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  uiReducer,
  Map(initialState), 
  composeEnhancers(applyMiddleware(thunk))
);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); 

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
