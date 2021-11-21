import { Metrics, ActionMetrics } from '../interfaces';
import { CLEAN_METRICS, UPDATE_METRICS } from '../constants/actionTypes';

const metrics = (state: Metrics[], action: ActionMetrics) => {
  let metricsList;
  if (!metricsList) metricsList = state.slice();

  switch (action.type) {
    case UPDATE_METRICS:
      metricsList.push(action.message);
      return metricsList;
    case CLEAN_METRICS:
      if (Array.isArray(action.message.metricsUpdated)) {
        return [...action.message.metricsUpdated];
      }
      return [action.message.metricsUpdated];
    default:
      return state;
  }
};
export default metrics;
