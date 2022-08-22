import React from "react";
import { useGlobalContext } from "../api";
import "../index.css";

const Info = () => {

  const { appData, parseNum } = useGlobalContext();
  
  return (
    <main className="Info-section">
      <div>
        <h2>Total samples Tested:</h2>
        <span>{parseNum(appData.totalSamples)}</span>
      </div>
      <div>
        <h2>Total Confirmed Cases:</h2>
        <span>{parseNum(appData.totalConfirmed)}</span>
      </div>
      <div>
        <h2>Total Active Cases:</h2>
        <span>{parseNum(appData.totalActive)}</span>
      </div>
      <div>
        <h2>Discharged:</h2>
        <span>{parseNum(appData.totalDischarged)}</span>
      </div>
      <div>
        <h2>Death:</h2>
        <span>{parseNum(appData.totalDeaths)}</span>
      </div>
    </main>
  );
};

export default Info;