import React, { createContext, useReducer, useContext } from "react";
import initialStateServers from "./initialStates/initialStateServers";
import initialStateMetrics from "./initialStates/initialStateMetrics";
import initialStateUser from "./initialStates/initialStateUser";
import initialStateSelectedMetric from "./initialStates/initialStateSelectedMetric";
import initialStateOfMultipleGraphs from "./initialStates/initialStateOfMultipleGraphs";
import initialStateTheme from './initialStates/initialStateTheme';
import user from "./reducers/user";
import metrics from "./reducers/metrics";
import servers from "./reducers/servers";
import selectedMetric from "./reducers/selectedMetric";
import metricsBeingCompared from "./reducers/metricsBeingCompared";
import initialStateSelectedServer from './initialStates/initialStateSelectedServer';
import theme from './reducers/theme';
import currentServer from './reducers/currentServer';

export const GlobalContext = createContext({}); // the provider needs to fill the state
export const GlobalProvider = ({ children }) => {
  const [userState, userDispatch]: [any, Function] = useReducer(
    user,
    initialStateUser
  );
  const [metricState, metricsDispatch]: [any, Function] = useReducer(
    metrics,
    initialStateMetrics
  );
  const [serverList, serversDispatch]: [any, Function] = useReducer(
    servers,
    initialStateServers
  );

  const [metricToGraph, selectedMetricDispatch]: [any, Function] = useReducer(
    selectedMetric,
    initialStateSelectedMetric
  );
  const [multipleGraphState, multipleGraphDispatch]: [any, any] = useReducer(
    metricsBeingCompared,
    initialStateOfMultipleGraphs
  );
  const [currentTheme, themeDispatch]: [{ light: boolean }, Function] =
    useReducer(theme, initialStateTheme);

  const [selectedServer, selectedServerDispatch]: [any, Function] = useReducer(
    currentServer,
    initialStateSelectedServer
  );

  return (
    <GlobalContext.Provider
      value={{
        user: { userState, userDispatch },
        metricsStore: { metricState, metricsDispatch },
        servers: { serverList, serversDispatch },
        currentServer: { selectedServer, selectedServerDispatch },
        metricToGraph: { metricToGraph, selectedMetricDispatch },
        multipleGraphSelections: { multipleGraphState, multipleGraphDispatch },
        themeContext: { currentTheme, themeDispatch },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useStore = () => useContext(GlobalContext);
