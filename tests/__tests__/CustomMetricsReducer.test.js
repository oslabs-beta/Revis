import currentServer from '../../src/context/reducers/currentServer';
import { CHANGE_METRIC } from '../../src/context/constants/actionTypes';

describe('Custom metrics reducer function', () => {
  test('should update the current metrics', () => {
    const selectedMetrics = {
      total_net_output_bytes: '10',
      used_memory: '11',
      connected_clients: '12',
      evicted_keys: '13',
      keyspace_hits: '14',
      keyspace_misses: '14',
      total_net_input_bytes: '15',
      uptime_in_seconds: '16',
    };

    const updatedServerState = {
      name: 'Updated Server',
      endpoint: 'Updated Endpoint',
      password: 'Updated password',
      port: 'Updated port',
    };

    const action = {
      type: CURRENT_SERVER,
      message: updatedServerState,
    };

    const updatedState = currentServer(selectedServerState, action);

    expect(updatedState).toEqual(updatedServerState);
  });
});
