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
      action.message.uptime_in_seconds = Number(
        action.message.uptime_in_seconds / 3600
      ).toFixed(0);

      action.message.used_memory = Number(
        action.message.used_memory * 1e-6
      ).toFixed(2);

      action.message.total_net_output_bytes = Number(
        action.message.total_net_output_bytes * 1e-6
      ).toFixed(2);

      action.message.total_net_input_bytes = Number(
        action.message.total_net_input_bytes * 1e-6
      ).toFixed(2);

      metricsList.push(action.message);
      // console.log(reformatDataForDB(metricsList));
      return metricsList;
    default:
      return state;
  }
};
export default metrics;
