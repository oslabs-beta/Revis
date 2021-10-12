import { Metrics, Action } from '../Types';

type State = Metrics[]; 

type Action = {
  type: string,
  message: Metrics
}
const metrics = (state: State, action: Action) => {
  const metric = action.message;

  switch (action.type) {
    case 'updateMetrics':
      return { state };
    default:
      return state;
  }
};
export default metrics;
