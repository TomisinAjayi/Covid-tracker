import React from "react";
import { useGlobalContext } from "../api";
import "../index.css";

const AllStates = () => {
  
  const { appData } = useGlobalContext();
  const { states } = appData;

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>State</th>
                    <th>Confirmed Cases</th>
                    <th>Cases On Admission</th>
                    <th>Discharged</th>
                    <th>Death</th>
                </tr>
            </thead>
            
            <tbody>
                    
                {states.map((item) => {
                const { state, confirmedCases, casesOnAdmission, discharged, death } = item;
                return (
                    <tr>
                        <td>{state}</td>
                        <td>{confirmedCases}</td>
                        <td>{casesOnAdmission}</td>
                        <td>{discharged}</td>
                        <td>{death}</td>
                    </tr>
                );
                })} 
            </tbody>
        </table>
      
    </div>
  );
};

export default AllStates;