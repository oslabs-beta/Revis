import { Interval, Action, ActionInterval } from '../interfaces';
import { UPDATE_INTERVAL, TOGGLE_INTERVAL } from '../constants/actionTypes';

const interval = (state: Interval, action: ActionInterval) => {
  const updatedInterval = { ...state };
  switch (action.type) {
    case UPDATE_INTERVAL: {
      updatedInterval.interval = Number(action.message) * 1000;
      return updatedInterval;
    }
    case TOGGLE_INTERVAL: {
      updatedInterval.update = action.message;
      return updatedInterval;
    }
    default:
      return state;
  }
};

export default interval;
