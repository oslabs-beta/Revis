import { ActionCurrentDate } from '../interfaces';
import { NEW_DATE_SELECTED, DATE_UNSELECTED } from '../constants/actionTypes';

const datesBeingCompared = (state: {}, action: ActionCurrentDate) => {
  const newDateSelected: string = action.message[0];
  const graphingData: string = action.message[1];

  const datesSelectedObject: {} = { ...state };
  switch (action.type) {
    case NEW_DATE_SELECTED: {
      datesSelectedObject[newDateSelected] = graphingData;
      return datesSelectedObject;
    }
    case DATE_UNSELECTED: {
      delete datesSelectedObject[newDateSelected];
      return datesSelectedObject;
    }
    default:
      return state;
  }
};
export default datesBeingCompared;
