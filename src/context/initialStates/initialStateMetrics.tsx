import { Metrics } from '../interfaces';

const metricsInitialState: Metrics[] = [
  {
    total_net_output_bytes: '0',
    used_memory: '0',
    connected_clients: '0',
    evicted_keys: '0',
    keyspace_hits: '0',
    keyspace_misses: '0',
    total_net_input_bytes: '0',
    uptime_in_seconds: '0',
    time: '0',
  },
];

export default metricsInitialState;
