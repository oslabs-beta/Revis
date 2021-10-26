import { MetricHistoryInterface, ActionMetricHistory } from '../interfaces';

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
    case 'addServer':
      return server;

    case 'deleteServer':
      return {};

    // case 'populateList': {
    // }
    default:
      return state;
  }
};

export default metricHistory;
