import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import initialStateServers from './initialStates/initialStateServers';
import initialStateMetrics from './initialStates/initialStateMetrics';
import initialStateUser from './initialStates/initialStateUser';
import initialStateSelectedMetric from './initialStates/initialStateSelectedMetric';
import initialStateOfMultipleGraphs from './initialStates/initialStateOfMultipleGraphs';
import initialStateTheme from './initialStates/initialStateTheme';
import initialStateUpdateInterval from './initialStates/initialStateUpdateInterval';
import initialStateSelectedServer from './initialStates/initialStateSelectedServer';
import initialStateMetricHistory from './initialStates/initialStateMetricHistory';
import initialStateOfDatesForHistory from './initialStates/initialStateOfDatesForHistory';
import initialStateCustomMetrics from './initialStates/initialStateCustomMetrics';
import user from './reducers/user';
import metrics from './reducers/metrics';
import servers from './reducers/servers';
import selectedMetric from './reducers/selectedMetric';
import metricsBeingCompared from './reducers/metricsBeingCompared';
import theme from './reducers/theme';
import currentServer from './reducers/currentServer';
import interval from './reducers/interval';
import metricHistory from './reducers/metricHistory';
import datesBeingCompared from './reducers/datesBeingCompared';
import customMetrics from './reducers/customMetrics';
import {
  User,
  Metrics,
  MultipleGraphs,
  Action,
  DatesSelected,
  Interval,
  ServerInterface,
  Theme,
  MetricHistory,
  Context,
  CurrentServer,
  ActionServerList,
  ActionCurrentServer,
  ActionInterval,
  ActionMetrics,
  ActionMetricHistory,
  ActionSelectedDates,
} from './interfaces';

export const GlobalContext = createContext<Partial<Context>>({});
export const GlobalProvider = ({ children }) => {
  const [userState, userDispatch]: [User, Dispatch<Action>] = useReducer(
    user,
    initialStateUser
  );
  const [metricState, metricsDispatch]: [Metrics[], Dispatch<ActionMetrics>] =
    useReducer(metrics, initialStateMetrics);

  const [serverList, serversDispatch]: [
    ServerInterface[],
    Dispatch<ActionServerList>
  ] = useReducer(servers, initialStateServers);

  const [metricToGraph, selectedMetricDispatch]: [string, Dispatch<Action>] =
    useReducer(selectedMetric, initialStateSelectedMetric);

  const [multipleGraphState, multipleGraphDispatch]: [
    MultipleGraphs,
    Dispatch<Action>
  ] = useReducer(metricsBeingCompared, initialStateOfMultipleGraphs);

  const [currentTheme, themeDispatch]: [Theme, Dispatch<Action>] = useReducer(
    theme,
    initialStateTheme
  );

  const [selectedServer, selectedServerDispatch]: [
    CurrentServer,
    Dispatch<ActionCurrentServer>
  ] = useReducer(currentServer, initialStateSelectedServer);

  const [updateInterval, updateIntervalDispatch]: [
    Interval,
    Dispatch<ActionInterval>
  ] = useReducer(interval, initialStateUpdateInterval);

  const [metricHistoryState, metricHistoryDispatch]: [
    MetricHistory,
    Dispatch<ActionMetricHistory>
  ] = useReducer(metricHistory, initialStateMetricHistory);

  const [datesSelectedState, datesSelectedDispatch]: [
    DatesSelected,
    Dispatch<ActionSelectedDates>
  ] = useReducer(datesBeingCompared, initialStateOfDatesForHistory);

  const [customMetricState, customMetricDispatch]: [
    Metrics,
    Dispatch<ActionMetrics>
  ] = useReducer(customMetrics, initialStateCustomMetrics);
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
        metricHistory: { metricHistoryState, metricHistoryDispatch },
        datesSelected: { datesSelectedState, datesSelectedDispatch },
        customMetrics: { customMetricState, customMetricDispatch },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
