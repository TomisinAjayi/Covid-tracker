import React, { useContext, useEffect, useState } from "react";
import { createStore } from "redux";
import axios from "axios";

const AppContext = React.createContext();

const API_URL = "https://covidnigeria.herokuapp.com/api";

const Provider = ({ children }) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const initialState = {
    totalSamples: 5441162,
    totalConfirmed: 262748,
    totalActive: 3083,
    totalDischarged: 256518,
    totalDeaths: 3147,
    states: [
      {
        state: "Lagos",
        _id: "tVCF2pWj9",
        confirmedCases: 102877,
        casesOnAdmission: 129,
        discharged: 101977,
        death: 771,
      },
    ],
  };
  const [storeData, setStoreData] = useState(initialState);
  const [error, setError] = useState({
    status: false,
    error: "something went wrong, Try again later",
  });
  // FUNCTIONS AND SIDE EFFECTS
  const reducer = (state, action) => {
    switch (action.type) {
      case "LOADED":
        return action.payload;
      default:
        return state;
    }
  };
  const store = createStore(reducer, initialState);
  const fetchData = async (url) => {
    setIsLoading(true);
    const response = await axios(url).catch((err) => console.log(err));
    
    if (response && response.hasOwnProperty("status")) {
      if (response.status === 200) {
        const { data: { data }, } = response;
        const {
          totalSamplesTested: totalSamples,
          totalConfirmedCases: totalConfirmed,
          totalActiveCases: totalActive,
          discharged: totalDischarged,
          death: totalDeaths,
          states,
        } = data;
        const newData = {
          totalSamples,
          totalConfirmed,
          totalActive,
          totalDischarged,
          totalDeaths,
          states,
        };
        setStoreData(newData);
        setError({ ...error, status: false });
        setIsLoading(false);
      }
    } else {
      console.log("something went wrong");
      setError({ ...error, status: true });
      setIsLoading(false);
    }
  };

  store.dispatch({ type: "LOADED", payload: storeData });
  const appData = store.getState();

  const parseNum = (x) => {
    if (typeof x === "string") {
      const tempArr = Array.from(x);
      const ind = tempArr.indexOf(",");
      tempArr.splice(ind, 1);
      let newStr = tempArr.join("");
      newStr = parseInt(newStr).toLocaleString("en-US");
      return newStr;
    }
    return x.toLocaleString("en-US");
  };
  useEffect(() => {
    fetchData(API_URL);
    
  }, []);
  
  return (
    <AppContext.Provider value={{ isLoading, appData, parseNum, error }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { Provider, useGlobalContext };