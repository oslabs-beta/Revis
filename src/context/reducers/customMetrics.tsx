import { Metrics, ActionMetrics } from '../interfaces';

const customMetrics = (state: Metrics, action: ActionMetrics) => {
  const updatedMetrics = { ...state };
  const { deletedMetric, updatedMetric } = action.message
  switch (action.type) {
    case 'changeMetric': {
      updatedMetrics[updatedMetric] = '';
      delete updatedMetrics[deletedMetric];
      return updatedMetrics;
    }
    default:
      return state;
  }
};

export default customMetrics;
