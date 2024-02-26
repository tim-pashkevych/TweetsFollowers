import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { ToastContainer } from "react-toastify"

import "modern-normalize/modern-normalize.css"
import "react-toastify/dist/ReactToastify.min.css"
import "./index.css"

import { persistor, store } from "./redux"
import App from "./components/App.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
)
