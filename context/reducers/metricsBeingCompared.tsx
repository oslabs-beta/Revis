import { Action } from "../Types";

const metricsBeingCompared = (state: Array<string>, action: Action) => {
  const newMetricsSelected: string = action.message;
  const metricsSelectedArray: Array<string> = state.slice();
  switch (action.type) {
    case "newMetricSelected": {
      metricsSelectedArray.push(newMetricsSelected);
      return metricsSelectedArray;
    }
    default:
      return state;
  }
};
export default metricsBeingCompared;
