import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.scss";
import UserContext from "./context/UserContext";
import WorkoutContext from "./context/WorkoutContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.NODE_ENV === "production") disableReactDevTools();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContext>
      <WorkoutContext>
        <App />
      </WorkoutContext>
    </UserContext>
  </React.StrictMode>
);
