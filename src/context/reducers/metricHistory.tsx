import { MetricHistoryInterface, ActionMetricHistory } from '../interfaces';
import { ADD_SERVER, DELETE_SERVER } from '../constants/actionTypes';

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

    default:
      return state;
  }
};

export default metricHistory;
