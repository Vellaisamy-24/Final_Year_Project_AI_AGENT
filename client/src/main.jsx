import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import TravelAgent from './TravelAgent.jsx'
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <TravelAgent /> */}
      <App />
    </Provider>
  </StrictMode>
);
