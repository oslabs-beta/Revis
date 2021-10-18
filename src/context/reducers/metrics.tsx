import { Metrics, Action } from "../Types";

const metrics = (state: Metrics, action: Action) => {
  const metricsList: any = state.slice();
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const metricsWithTime = { time, ...action.message };

  switch (action.type) {
    case "updateMetrics":
      metricsList.push(metricsWithTime);
      return metricsList;
    default:
      return state;
  }
};
export default metrics;
