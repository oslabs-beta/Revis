import customMetrics from '../../src/context/reducers/customMetrics';
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

		const updatedMetric = {
			total_net_output_bytes: '1000',
			used_memory: '1123',
			connected_clients: '1234',
			evicted_keys: '1345',
			keyspace_hits: '1456',
			keyspace_misses: '1415',
			total_net_input_bytes: '1567',
			uptime_in_seconds: '1652',
		};

		const deletedMetric = {
			total_net_output_bytes: '1000',
			used_memory: '1123',
			connected_clients: '1234',
			evicted_keys: '1345',
			keyspace_hits: '1456',
			keyspace_misses: '1415',
			total_net_input_bytes: '1567',
			uptime_in_seconds: '1652',
		};

		const action = {
			type: CHANGE_METRIC,
			message: { updatedMetric },
		};

		const updatedState = customMetrics(selectedMetrics, action);

		expect(updatedState).toEqual(updatedServerState);
	});
});
