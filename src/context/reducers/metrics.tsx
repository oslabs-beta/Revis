import { Metrics, ActionMetrics } from '../interfaces';

const metrics = (state: Metrics[], action: ActionMetrics) => {
  let metricsList;
  if (!metricsList) metricsList = state.slice();

  switch (action.type) {
    case 'updateMetrics':
      metricsList.push(action.message);
      return metricsList;
    case 'cleanMetrics':
      if (Array.isArray(action.message.metricsUpdated)) {
        return [...action.message.metricsUpdated];
      }
      return [action.message.metricsUpdated];
    default:
      return state;
  }
};
export default metrics;
