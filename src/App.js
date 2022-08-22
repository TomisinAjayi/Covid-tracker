import React from "react";
import Main from "./components/Main";
import { useGlobalContext } from "./api";
import "./index.css";

const App = () => {
  const { error } = useGlobalContext();
  return (
    <div className="body-section">
        <h1>
            Covid Tracker in Nigeria
        </h1>
        {error.status && (
            <p style={{ color: "red", fontSize: "25px", textAlign: "center" }}>
            An error just occurred. Try again later!!
        </p>
        )}
        <Main />
    </div>
);
};

export default App;