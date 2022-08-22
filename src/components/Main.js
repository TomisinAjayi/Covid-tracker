import React from "react";
import Info from "./Info";
import { useGlobalContext } from "../api";
import "../index.css";
import AllStates from "./AllStates";

const Main = () => {
  const { isLoading } = useGlobalContext();

  if (isLoading) {
    return <div></div>;
  }
  return (
    <div>
      <Info />
      <AllStates />
    </div>
  );
};


export default Main;