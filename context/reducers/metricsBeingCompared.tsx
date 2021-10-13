import { Action } from "../Types";

const metricsBeingCompared = (state: {}, action: Action) => {
  const newMetricsSelected: string = action.message;
  const metricsSelectedObject: {} = { ...state };
  switch (action.type) {
    case "newMetricSelected": {
      metricsSelectedObject[newMetricsSelected] = true;
      return metricsSelectedObject;
    }
    case "metricUnselected": {
      delete metricsSelectedObject[newMetricsSelected];
      return metricsSelectedObject;
    }
    default:
      return state;
  }
};
export default metricsBeingCompared;
