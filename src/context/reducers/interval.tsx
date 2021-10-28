import { Interval, Action, ActionInterval } from '../interfaces';

const interval = (state: Interval, action: ActionInterval) => {
  const updatedInterval = { ...state };
  switch (action.type) {
    case 'updateInterval': {
      updatedInterval.interval = Number(action.message) * 1000;
      return updatedInterval;
    }
    case 'toggleInterval': {
      updatedInterval.update = action.message;
      return updatedInterval;
    }
    default:
      return state;
  }
};

export default interval;
