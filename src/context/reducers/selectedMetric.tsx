import { Action } from '../interfaces';

const selectedMetric = (state: string, action: Action) => {
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
