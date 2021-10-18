import { Metrics, ActionMetrics } from '../interfaces';

const metrics = (state: Metrics[], action: ActionMetrics) => {
  const metricsList = state.slice();
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  const metricsWithTime = { time, ...action.message };

  switch (action.type) {
    case 'updateMetrics':
      metricsList.push(metricsWithTime);
      return metricsList;
    default:
      return state;
  }
};
export default metrics;
