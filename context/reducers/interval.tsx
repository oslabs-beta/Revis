import { Interval, Action } from '../Types'

const interval = (state: Interval, action: Action) => {
  const updatedInterval = {...state};
  switch (action.type) {
    case ('updateInterval'): {
      updatedInterval.interval = Number(action.message) * 1000;
      return updatedInterval;
    }
    case ('toggleInterval'): {
      updatedInterval.update = action.message;
      return updatedInterval;
    }
    default: 
      return state;
  }
}

export default interval;
