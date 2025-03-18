import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import TravelAgent from './TravelAgent.jsx'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <TravelAgent /> */}
    <App />
  </StrictMode>
);
