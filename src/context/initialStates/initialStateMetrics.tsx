import { Metrics } from '../interfaces';

const metricsInitialState: Metrics[] = [
  {
    total_net_output_bytes: '',
    used_memory: '',
    connected_clients: '',
    evicted_keys: '',
    keyspace_hits: '',
    keyspace_misses: '',
    total_net_input_bytes: '',
    uptime_in_seconds: '',
    client_longest_output_list: '',
    client_biggest_input_buf: '',
    blocked_clients: '',
    used_memory_rss: '',
    used_memory_peak: '',
    total_connections_received: '',
    total_commands_processed: '',
    instantaneous_ops_per_sec: '',
    instantaneous_input_kbps: '',
    instantaneous_output_kbps: '',
    rejected_connections: '',
    total_error_replies: '',
    used_cpu_sys: '',
    used_cpu_user: '',
    used_cpu_sys_children: '',
    used_cpu_user_children: '',
    used_cpu_sys_main_thread: '',
    used_cpu_user_main_thread: '',
  },
];

export default metricsInitialState;
