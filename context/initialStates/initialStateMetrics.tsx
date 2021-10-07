type Metrics = {
  total_net_output_bytes: any;
  used_memory: any;
  connected_clients: any;
  evicted_keys: any;
  keyspace_hits: any;
  keyspace_misses: any;
  total_net_input_bytes: any;
  uptime_in_seconds: any;
};
const metricsInitialState: Metrics = {
  total_net_output_bytes: "",
  used_memory: "",
  connected_clients: "",
  evicted_keys: "",
  keyspace_hits: "",
  keyspace_misses: "",
  total_net_input_bytes: "",
  uptime_in_seconds: "",
};

export default metricsInitialState;
