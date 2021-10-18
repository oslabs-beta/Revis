const descriptions = {
  total_net_output_bytes: 'The total number of bytes written to the network',
  used_memory: 'Total number of bytes allocated by Redis using its allocator',
  connected_clients: 'Number of client connections (excluding connections from replicas)',
  evicted_keys: 'Number of evicted keys due to maxmemory limit',
  keyspace_hits: 'Number of successful lookup of keys in the main dictionary',
  keyspace_misses: 'Number of failed lookup of keys in the main dictionary',
  total_net_input_bytes: 'The total number of bytes read from the network',
  uptime_in_seconds: 'Number of seconds since Redis server start',
}

export default descriptions;
