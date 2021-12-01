import { Action } from '../interfaces';
import { UPDATE_SELECTED_METRIC } from '../constants/actionTypes';

const selectedMetric = (state: string, action: Action) => {
  switch (action.type) {
    case UPDATE_SELECTED_METRIC: {
      const newSelectedMetric: string = action.message;
      return newSelectedMetric;
    }
    default:
      return state;
  }
};
export default selectedMetric;
