import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import initialStateServers from './initialStates/initialStateServers';
import initialStateMetrics from './initialStates/initialStateMetrics';
import initialStateUser from './initialStates/initialStateUser';
import initialStateSelectedMetric from './initialStates/initialStateSelectedMetric';
import initialStateOfMultipleGraphs from './initialStates/initialStateOfMultipleGraphs';
import initialStateTheme from './initialStates/initialStateTheme';
import initialStateUpdateInterval from './initialStates/initialStateUpdateInterval';
import initialStateSelectedServer from './initialStates/initialStateSelectedServer';
import user from './reducers/user';
import metrics from './reducers/metrics';
import servers from './reducers/servers';
import selectedMetric from './reducers/selectedMetric';
import metricsBeingCompared from './reducers/metricsBeingCompared';
import theme from './reducers/theme';
import currentServer from './reducers/currentServer';
import interval from './reducers/interval';
import {
  User,
  Metrics,
  Action,
  Interval,
  Server,
  Theme,
  Context,
  CurrentServer,
  ActionServerList,
  ActionCurrentServer,
} from './interfaces';

export const GlobalContext = createContext({}); // the provider needs to fill the state
export const GlobalProvider = ({ children }) => {
  const [userState, userDispatch]: [User, Dispatch<Action>] = useReducer(
    user,
    initialStateUser
  );
  const [metricState, metricsDispatch]: [Metrics, Dispatch<Action>] =
    useReducer(metrics, initialStateMetrics);

  const [serverList, serversDispatch]: [Server[], Dispatch<ActionServerList>] =
    useReducer(servers, initialStateServers);

  const [metricToGraph, selectedMetricDispatch]: [string, Dispatch<Action>] =
    useReducer(selectedMetric, initialStateSelectedMetric);

  const [multipleGraphState, multipleGraphDispatch]: [any, Dispatch<Action>] =
    useReducer(metricsBeingCompared, initialStateOfMultipleGraphs);

  const [currentTheme, themeDispatch]: [Theme, Dispatch<Action>] = useReducer(
    theme,
    initialStateTheme
  );

  const [selectedServer, selectedServerDispatch]: [
    CurrentServer,
    Dispatch<ActionCurrentServer>
  ] = useReducer(currentServer, initialStateSelectedServer);

  const [updateInterval, updateIntervalDispatch]: [Interval, Dispatch<Action>] =
    useReducer(interval, initialStateUpdateInterval);
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
        graphInterval: { updateInterval, updateIntervalDispatch },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useStore = () => useContext(GlobalContext);
