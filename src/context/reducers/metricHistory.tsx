import { MetricHistoryInterface, ActionMetricHistory } from '../interfaces';
import { ADD_SERVER, DELETE_SERVER } from '../constants/actionTypes';

const deleteServerFromDataBase = (name: string) => {
	fetch('/api/servers', {
		method: 'DELETE',
		body: JSON.stringify({ name }),
		'Content-Type': 'application/json',
	});
};

const postServerToDataBase = (
	name: string,
	endpoint: string,
	port: string,
	username: string,
	password: string
) => {
	fetch('/api/servers', {
		method: 'POST',
		body: JSON.stringify({ name, endpoint, port, username, password }),
		'Content-Type': 'application/json',
	});
};

const metricHistory = (
	state: MetricHistoryInterface,
	action: ActionMetricHistory
) => {
	const server: MetricHistoryInterface = action.message;

	switch (action.type) {
		case ADD_SERVER:
			return server;

		case DELETE_SERVER:
			return {};

		// case 'populateList': {
		// }
		default:
			return state;
	}
};

export default metricHistory;
