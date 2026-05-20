import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ProgressProvider>
 <App />
  </ProgressProvider>
  </BrowserRouter>
);