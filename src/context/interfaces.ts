import { Dispatch } from 'react';

export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string | null;
  session?: string;
}
export interface Theme {
  light: boolean;
}
export interface Metrics {
  [metric: string]: string | number;
}

export interface Interval {
  update: boolean;
  interval: number;
}

export interface CurrentServer {
  name: string;
  endpoint: string;
  password?: string;
  port: string;
  sessionToken?: string;
}

export interface ServerInterface {
  name?: string;
  ip?: string;
  port?: string;
  username?: string;
  endpoint?: string;
  password?: string;
  currentServer?: CurrentServer;
}

export interface Action {
  type: string;
  message: string;
}

export interface ActionCurrentDate {
  type: string;
  message: [string, string, string];
}

export interface ActionServerList {
  type: string;
  message: ServerInterface | string[];
}

export interface ActionCurrentServer {
  type: string;
  message: CurrentServer;
}

export interface ActionMetrics {
  type: string;
  message: Metrics;
}

export interface ActionInterval {
  type: string;
  message: boolean;
}

export interface ActionMetricHistory {
  type: string;
  message: { date: string; data: Metrics[] };
}

export interface ActionSelectedDates {
  type: string;
  message: string;
}

export interface HomePageProps {
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  previousPage?: () => () => void;
}

export interface MetricsProps {
  metricName: string;
  metricValue: string;
  changeCurrentRender: () => void;
}

export interface ParsedBodyRedis {
  endpoint: string;
  password: string;
  port: string;
}

export interface ParsedBodyServer {
  name: string;
  endpoint: string;
  password: string;
  port: string;
}

export interface metricsSQLtoRedis {
  server_id: number;
  endpoint: string;
  name: string;
  value: string[];
  date: Date;
}

export interface MultipleGraphs {
  [metric: string]: boolean;
}

export interface DatesSelected {}

export interface MetricHistoryInterface {
  date: string;
  data: Metrics[];
}

export interface UserContext {
  userState: User;
  userDispatch: Dispatch<Action>;
}

export interface MetricsStoreContext {
  metricState: Metrics[];
  metricsDispatch: Dispatch<ActionMetrics>;
}

export interface ServersContext {
  serverList: ServerInterface[];
  serversDispatch: Dispatch<ActionServerList>;
}

export interface CurrentServerContext {
  selectedServer: ServerInterface;
  selectedServerDispatch: Dispatch<ActionCurrentServer>;
}
export interface MetricToGraphContext {
  metricToGraph: string;
  selectedMetricDispatch: Dispatch<Action>;
}

export interface MultipleGraphSelectionsContext {
  multipleGraphState: MultipleGraphs;
  multipleGraphDispatch: Dispatch<Action>;
}

export interface ThemeContext {
  currentTheme: Theme;
  themeDispatch: Dispatch<Action>;
}

export interface GraphIntervalContext {
  updateInterval: Interval;
  updateIntervalDispatch: Dispatch<ActionInterval>;
}

export interface MetricHistoryContext {
  metricHistoryState: MetricHistoryInterface[];
  metricHistoryDispatch: Dispatch<ActionMetricHistory>;
}
interface customMetricsContext {
  customMetricState: Metrics;
  customMetricDispatch: Dispatch<ActionMetrics>;
}

export interface DatesSelectedContext {
  datesSelectedState: DatesSelected;
  datesSelectedDispatch: Dispatch<ActionSelectedDates>;
}

export interface Context {
  user?: UserContext;
  metricsStore?: MetricsStoreContext;
  servers?: ServersContext;
  currentServer?: CurrentServerContext;
  metricToGraph?: MetricToGraphContext;
  multipleGraphSelections?: MultipleGraphSelectionsContext;
  themeContext?: ThemeContext;
  graphInterval?: GraphIntervalContext;
  metricHistory?: MetricHistoryContext;
  datesSelected?: DatesSelectedContext;
}

export interface Layouts {
  0?: string;
  1?: string;
  2?: string;
  3?: string;
  customMetrics?: customMetricsContext;
}
