import { Metrics, ActionMetrics } from '../interfaces';
import { CHANGE_METRIC } from '../constants/actionTypes';

const customMetrics = (state: Metrics, action: ActionMetrics) => {
  const updatedMetrics = { ...state };
  const { deletedMetric, updatedMetric } = action.message;
  switch (action.type) {
    case CHANGE_METRIC: {
      updatedMetrics[updatedMetric] = '';
      delete updatedMetrics[deletedMetric];
      return updatedMetrics;
    }
    default:
      return state;
  }
};

export default customMetrics;
