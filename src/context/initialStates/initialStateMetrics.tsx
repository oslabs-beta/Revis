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
    client_longest_output_list: '0',
    client_biggest_input_buf: '0',
    blocked_clients: '0',
    used_memory_rss: '0',
    used_memory_peak: '0',
    total_connections_received: '0',
    total_commands_processed: '0',
    instantaneous_ops_per_sec: '0',
    instantaneous_input_kbps: '0',
    instantaneous_output_kbps: '0',
    rejected_connections: '0',
    total_error_replies: '0',
    used_cpu_sys: '0',
    used_cpu_user: '0',
    used_cpu_sys_children: '0',
    used_cpu_user_children: '0',
    used_cpu_sys_main_thread: '0',
    used_cpu_user_main_thread: '0',
  },
];

export default metricsInitialState;
