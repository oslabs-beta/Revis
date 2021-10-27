import { ActionCurrentDate } from '../interfaces';

const datesBeingCompared = (state: {}, action: ActionCurrentDate) => {
  const newDateSelected: string = action.message[0];
  const graphingData: string = action.message[1];

  const datesSelectedObject: {} = { ...state };
  switch (action.type) {
    case 'newDateSelected': {
      datesSelectedObject[newDateSelected] = graphingData;
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
