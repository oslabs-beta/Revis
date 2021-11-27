import { Action } from '../Types';
import { UPDATE_USERNAME } from '../constants/actionTypes';

type User = {
  username: string;
};
const user = (state: User, action: Action) => {
  switch (action.type) {
    case UPDATE_USERNAME: {
      const username: string = action.message;
      return { ...state, username };
    }
    default:
      return state;
  }
};
export default user;
