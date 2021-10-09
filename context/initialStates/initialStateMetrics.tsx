import { Metrics } from '../Types';

const metricsInitialState: Metrics = {
  total_net_output_bytes: '',
  used_memory: '',
  connected_clients: '',
  evicted_keys: '',
  keyspace_hits: '',
  keyspace_misses: '',
  total_net_input_bytes: '',
  uptime_in_seconds: '',
};

export default metricsInitialState;
