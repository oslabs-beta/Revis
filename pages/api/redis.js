const Redis = require('ioredis');


export default async () => {
 function connectingToRedis() {

  const redis = new Redis({
    host: 'redis-18891.c9.us-east-1-4.ec2.cloud.redislabs.com',
    port: 18891,
    password: 'Etttmq5T4ubqnE6TaYltcjXmdobQAjfq',
  });

    redis.on('ready', async () => {

    const theping = await redis.ping();
    console.log(theping);
  });

 }

 function creatingMetricsObject() {
  let memory = await redis.info();
  memory = memory.split('\r\n');
  
  const objWithMetrics = {};
  memory.forEach(el=>{
    
    const keysAndValues = el.split(':');
    objWithMetrics[keysAndValues[0]] = keysAndValues[1];
  })



}


/*
# Server
redis_version:6.2.3
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:0000000000000000000000000000000000000000
redis_mode:standalone
os:Linux 5.4.0-1051-aws x86_64
arch_bits:64
multiplexing_api:epoll
gcc_version:7.5.0
process_id:10641201
run_id:2af5d6635afc7b68653571f2cb0d30a5a9a7f0a4
tcp_port:18891
server_time_usec:1633551916000000
uptime_in_seconds:106747
uptime_in_days:1
hz:10
lru_clock:0
config_file:

# Clients
connected_clients:0
client_longest_output_list:0
client_biggest_input_buf:0
blocked_clients:0
maxclients:30
cluster_connections:0

# Memory
used_memory:2104568
used_memory_human:2.0M
used_memory_rss:2104568
used_memory_peak:2835104
used_memory_peak_human:2.70M
used_memory_lua:37888
mem_fragmentation_ratio:1
mem_allocator:jemalloc-5.1.0

# Persistence
loading:0
rdb_changes_since_last_save:2
rdb_bgsave_in_progress:0
rdb_last_save_time:1633445167
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:0
rdb_current_bgsave_time_sec:-1
aof_enabled:0
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_last_write_status:ok

# Stats
total_connections_received:6113
total_commands_processed:67
instantaneous_ops_per_sec:0
total_net_input_bytes:7986059
total_net_output_bytes:130210708
instantaneous_input_kbps:0.07
instantaneous_output_kbps:1.18
rejected_connections:0
sync_full:0
sync_partial_ok:0
sync_partial_err:0
expired_keys:0
evicted_keys:0
keyspace_hits:4
keyspace_misses:3
pubsub_channels:0
pubsub_patterns:0
latest_fork_usec:0
migrate_cached_sockets:0
total_forks:0
total_error_replies:0

# Replication
role:master
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

# CPU
used_cpu_sys:0.00
used_cpu_user:0.00
used_cpu_sys_children:0.00
used_cpu_user_children:0.00
used_cpu_sys_main_thread:0.00
used_cpu_user_main_thread:0.00

# Cluster
cluster_enabled:0

# Keyspace
db0:keys=2,expires=0,avg_ttl=0
*/