import { Action } from '../Types';

type selectedMetric = {
  selectedMetric: string;
};
const selectedMetric = (state: selectedMetric, action: Action) => {
  switch (action.type) {
    case 'updateSelectedMetric': {
      const newSelectedMetric: string = action.message;
      return newSelectedMetric;
    }
    default:
      return state;
  }
};
export default selectedMetric;
