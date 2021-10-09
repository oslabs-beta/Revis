import { Metrics, Action } from '../Types';

const metrics = (state: Metrics, action: Action) => {
  const metricsUpdated: any = action.message;

  switch (action.type) {
    case 'updateMetrics':
      return { ...state, metricsUpdated };
    default:
      return state;
  }
};
export default metrics;
