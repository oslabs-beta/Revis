import { Action } from "../Types";

const metricsBeingCompared = (state: Array<string>, action: Action) => {
  const newMetricsSelected: string = action.message;
  const metricsSelectedArray: Array<string> = state.slice();
  switch (action.type) {
    case "newMetricSelected": {
      console.log('metrics select4ed')
      metricsSelectedArray.push(newMetricsSelected);
      return metricsSelectedArray;
    }
    case "metricUnselected": {
      console.log('metric unselected')
      const indexToDelete = metricsSelectedArray.indexOf(newMetricsSelected)
      metricsSelectedArray.splice(indexToDelete,1);
      return metricsSelectedArray;
    }
    default:
      return state;
  }
};
export default metricsBeingCompared;
