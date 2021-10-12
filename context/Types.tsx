export type Metrics = {
  total_net_output_bytes: string;
  used_memory: string;
  connected_clients: string;
  evicted_keys: string;
  keyspace_hits: string;
  keyspace_misses: string;
  total_net_input_bytes: string;
  uptime_in_seconds: string;
};
export type Server = {
  name: string;
  ip: string;
  port: string;
  username: string;
  endpoint: string;
  password: string;
  currentServer?: string[];
};

export type Action = {
  type: string;
  message: string;
};
