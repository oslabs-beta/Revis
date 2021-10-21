import { Metrics, ActionMetrics } from '../interfaces';

const metrics = (state: Metrics[], action: ActionMetrics) => {
  const metricsList = state.slice();

  switch (action.type) {
    case 'updateMetrics':
      console.log(metricsList);
      metricsList.push(action.message);
      return metricsList;
    default:
      return state;
  }
};
export default metrics;
