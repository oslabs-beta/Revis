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
  total_net_output_bytes: string;
  used_memory: string;
  connected_clients: string;
  evicted_keys: string;
  keyspace_hits: string;
  keyspace_misses: string;
  total_net_input_bytes: string;
  uptime_in_seconds: string;
}

export interface CurrentServer {
  name?: string;
  endpoint: string;
  password: string;
  port: string;
  sessionToken?: string;
}

export interface Server {
  name?: string;
  ip?: string;
  port?: string;
  username: string;
  endpoint: string;
  password: string;
  currentServer?: CurrentServer;
}

export interface Action {
  type: string;
  message: string;
}

export interface ActionServerList {
  type: string;
  message: Server;
}

export interface ActionCurrentServer {
  type: string;
  message: CurrentServer;
}

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

export interface Context {
  user: { userState: User; userDispatch: Dispatch<Action> };
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
