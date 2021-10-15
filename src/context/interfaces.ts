import { Dispatch } from 'react';
import { Action } from './Types';

export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string | null;
  session?: string;
}

export interface Metrics {
  total_net_output_bytes: string | number;
  used_memory: string | number;
  connected_clients: string | number;
  evicted_keys: string | number;
  keyspace_hits: string | number;
  keyspace_misses: string | number;
  total_net_input_bytes: string | number;
  uptime_in_seconds: string | number;
}

export interface CurrentServer {
  name?: string;
  endpoint: string;
  password: string;
  port: string | number;
  sessionToken?: string;
}

export interface Server {
  name: string;
  ip: string;
  port: string;
  username: string;
  endpoint: string;
  password: string;
  currentServer?: CurrentServer;
}

export interface Action {
  type: string;
  message: string;
}

export interface UserProvider {
  userState?: User;
  userDispatch?: Function;
  metricState?: Metrics;
  metricsDispatch?: Function;
  severList?: Server[];
  serversDispatch?: Function;
}

export interface UseStore {}

export interface HomePageProps {
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  previousPage?: () => () => void;
}

export interface MetricsProps {
  keys: string;
  values: string;
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

export interface MetricsList {
  total_net_output_bytes?: string | string[];
  used_memory?: string | string[];
  connected_clients?: string | string[];
  evicted_keys?: string | string[];
  keyspace_hits?: string | string[];
  keyspace_misses?: string | string[];
  total_net_input_bytes?: string | string[];
  uptime_in_seconds?: string | string[];
}

export interface GlobalContext {
  user: { User: User; userDispatch: Dispatch<Action> };
  metricsStore: { metricState: MetricsList; metricsDispatch: Dispatch<Action> };
  servers: { serverList; serversDispatch: Dispatch<Action> };
  currentServer: { selectedServer; selectedServerDispatch: Dispatch<Action> };
  metricToGraph: { metricToGraph; selectedMetricDispatch: Dispatch<Action> };
  multipleGraphSelections: {
    multipleGraphState;
    multipleGraphDispatch: Dispatch<Action>;
  };
  themeContext: { currentTheme; themeDispatch: Dispatch<Action> };
  graphInterval: { updateInterval; updateIntervalDispatch: Dispatch<Action> };
}
