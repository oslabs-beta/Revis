import { Action } from "../Types";

const metricsBeingCompared = (state: {}, action: Action) => {
  const newMetricsSelected: string = action.message;
  const metricsSelectedObject: {} = {...state};
  switch (action.type) {
    case "newMetricSelected": {
      // if (Object.keys(metricsSelectedObject).length >= 4) {
      //   alert("Only 4 graphs can be shown simultaneously");
      //   return metricsSelectedObject;
      // }

      metricsSelectedObject[newMetricsSelected] = true;
      return metricsSelectedObject;
    }
    case "metricUnselected": {
      // const indexToDelete = metricsSelectedObject.indexOf(newMetricsSelected);
      // metricsSelectedObject.splice(indexToDelete, 1);
      // return metricsSelectedObject;
      delete metricsSelectedObject[newMetricsSelected];
      return metricsSelectedObject;
    }
    default:
      return state;
  }
};
export default metricsBeingCompared;
