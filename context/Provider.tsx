<<<<<<< HEAD
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
=======
import React, { createContext, useReducer, useContext } from 'react';
import initialStateServers from './initialStates/initialStateServers';
import initialStateMetrics from './initialStates/initialStateMetrics';
import initialStateUser from './initialStates/initialStateUser';
import initialStateSelectedMetric from './initialStates/initialStateSelectedMetric';
import initialStateTheme from './initialStates/initialStateTheme';
import user from './reducers/user';
import metrics from './reducers/metrics';
import servers from './reducers/servers';
import selectedMetric from './reducers/selectedMetric';
import theme from './reducers/theme';
>>>>>>> 60c90469f0bea2617e5fe38e2545af203f7ff7de

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
<<<<<<< HEAD
  const [multipleGraphState, multipleGraphDispatch]: [any, any] = useReducer(
    metricsBeingCompared,
    initialStateOfMultipleGraphs
  );
=======
  const [currentTheme, themeDispatch]: [{ light: boolean }, Function] =
    useReducer(theme, initialStateTheme);
>>>>>>> 60c90469f0bea2617e5fe38e2545af203f7ff7de
  return (
    <GlobalContext.Provider
      value={{
        user: { userState, userDispatch },
        metricsStore: { metricState, metricsDispatch },
        servers: { serverList, serversDispatch },
        metricToGraph: { metricToGraph, selectedMetricDispatch },
<<<<<<< HEAD
        multipleGraphSelections: { multipleGraphState, multipleGraphDispatch },
=======
        themeContext: { currentTheme, themeDispatch },
>>>>>>> 60c90469f0bea2617e5fe38e2545af203f7ff7de
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useStore = () => useContext(GlobalContext);
