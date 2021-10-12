import React, { createContext, useReducer, useContext } from "react";
import initialStateServers from "./initialStates/initialStateServers";
import initialStateMetrics from "./initialStates/initialStateMetrics";
import initialStateUser from "./initialStates/initialStateUser";
import initialStateSelectedMetric from "./initialStates/initialStateSelectedMetric";
import initialStateOfMultipleGraphs from "./initialStates/initialStateOfMultipleGraphs";
import user from "./reducers/user";
import metrics from "./reducers/metrics";
import servers from "./reducers/servers";
import selectedMetric from "./reducers/selectedMetric";
import metricsBeingCompared from "./reducers/metricsBeingCompared";

export const GlobalContext = createContext({}); // the provider needs to fill the state
export const GlobalProvider = ({ children }) => {
  const [userState, userDispatch]: [any, any] = useReducer(
    user,
    initialStateUser
  );
  const [metricState, metricsDispatch]: [any, any] = useReducer(
    metrics,
    initialStateMetrics
  );
  const [serverList, serversDispatch]: [any, any] = useReducer(
    servers,
    initialStateServers
  );

  const [metricToGraph, selectedMetricDispatch]: [any, any] = useReducer(
    selectedMetric,
    initialStateSelectedMetric
  );
  const [multipleGraphState, multipleGraphDispatch]: [any, any] = useReducer(
    metricsBeingCompared,
    initialStateOfMultipleGraphs
  );
  return (
    <GlobalContext.Provider
      value={{
        user: { userState, userDispatch },
        metricsStore: { metricState, metricsDispatch },
        servers: { serverList, serversDispatch },
        metricToGraph: { metricToGraph, selectedMetricDispatch },
        multipleGraphSelections: { multipleGraphState, multipleGraphDispatch },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useStore = () => useContext(GlobalContext);
