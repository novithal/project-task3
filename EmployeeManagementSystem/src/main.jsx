import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { HRProvider } from "./context/HRContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HRProvider>
        <App />
      </HRProvider>
    </BrowserRouter>
  </React.StrictMode>
);