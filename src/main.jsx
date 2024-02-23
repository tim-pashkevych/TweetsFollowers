import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import "modern-normalize/modern-normalize.css"
import "react-toastify/dist/ReactToastify.min.css"
import "./index.css"

import App from "./components/App.jsx"
import { ContextProvider } from "./context/ContextProvider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
)
