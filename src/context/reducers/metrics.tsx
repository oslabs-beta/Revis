import { Metrics, ActionMetrics } from '../interfaces';

const metrics = (state: Metrics[], action: ActionMetrics) => {
  const metricsList = state.slice();

  const reformatDataForDB = (metrics: Metrics[]) => {
    const reformattedData = {};
    metrics.forEach((metricData) => {
      Object.entries(metricData).forEach(([metricName, value]) => {
        if (!(metricName in reformattedData)) reformattedData[metricName] = [];
        reformattedData[metricName].push(value);
      });
    });
    return reformattedData;
  };

  switch (action.type) {
    case 'updateMetrics':
      metricsList.push(action.message);
      console.log(reformatDataForDB(metricsList));
      return metricsList;
    default:
      return state;
  }
};
export default metrics;
