import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Store from "./store/store.js";

const store = new Store();

export const Context = createContext({
  store,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context.Provider value={{ store }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
