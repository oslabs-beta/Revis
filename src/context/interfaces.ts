import { Dispatch } from 'react';
import { Action } from './Types';

export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string | null;
  session?: string;
}

export interface UserProvider {
  userState: User;
  userDispatch: Dispatch<Action>;
}

export interface ParsedBodyCreateUser {
  username: string;
  password: string;
  email: string;
}

export interface ParsedBodyRedis {
  endpoint: string;
  password: string;
  port: number;
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
