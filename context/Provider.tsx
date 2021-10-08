import React, { createContext, useReducer, useContext } from "react";
import initialStateServers from "./initialStates/initialStateServers";
import initialStateMetrics from "./initialStates/initialStateMetrics";
import initialStateUser from "./initialStates/initialStateUser";
import user from "./reducers/user";
import metrics from "./reducers/metrics";
import servers from "./reducers/servers";

export const GlobalContext = createContext({}); //the provider needs to fill the state
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
  return (
    <GlobalContext.Provider
      value={{
        user: { userState, userDispatch },
        metricsStore: { metricState, metricsDispatch },
        servers: { serverList, serversDispatch },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useStore = () => useContext(GlobalContext);
