import customMetrics from '../../src/context/reducers/customMetrics';
import { CHANGE_METRIC } from '../../src/context/constants/actionTypes';

describe('Custom metrics reducer function', () => {
  it('should update the current metrics', () => {
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

    const updatedMetric = 'test_category';

    const deletedMetric = 'total_net_output_bytes';

    const action = {
      type: CHANGE_METRIC,
      message: { updatedMetric, deletedMetric },
    };

    const updatedState = customMetrics(selectedMetrics, action);

    const expectedState = {
      used_memory: '11',
      connected_clients: '12',
      evicted_keys: '13',
      keyspace_hits: '14',
      keyspace_misses: '14',
      total_net_input_bytes: '15',
      uptime_in_seconds: '16',
      test_category: '',
    };

    expect(updatedState).toEqual(expectedState);
  });
});
