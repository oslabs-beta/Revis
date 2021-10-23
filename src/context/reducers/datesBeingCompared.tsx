import { Action } from '../Types';

const datesBeingCompared = (state: {}, action: Action) => {
  const newDateSelected: string = action.message;
  const datesSelectedObject: {} = { ...state };
  switch (action.type) {
    case 'newDateSelected': {
      datesSelectedObject[newDateSelected] = true;
      return datesSelectedObject;
    }
    case 'dateUnselected': {
      delete datesSelectedObject[newDateSelected];
      return datesSelectedObject;
    }
    default:
      return state;
  }
};
export default datesBeingCompared;
