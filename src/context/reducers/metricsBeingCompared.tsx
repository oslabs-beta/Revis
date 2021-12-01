import { Action } from '../Types';
import {
  NEW_METRIC_SELECTED,
  METRIC_UNSELECTED,
} from '../constants/actionTypes';

const metricsBeingCompared = (state: {}, action: Action) => {
  const newMetricsSelected: string = action.message;
  const metricsSelectedObject: {} = { ...state };
  switch (action.type) {
    case NEW_METRIC_SELECTED: {
      metricsSelectedObject[newMetricsSelected] = true;
      return metricsSelectedObject;
    }
    case METRIC_UNSELECTED: {
      delete metricsSelectedObject[newMetricsSelected];
      return metricsSelectedObject;
    }
    default:
      return state;
  }
};
export default metricsBeingCompared;
