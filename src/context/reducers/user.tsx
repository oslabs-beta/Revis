import { Action } from '../Types';

type User = {
  username: string;
};
const user = (state: User, action: Action) => {
  switch (action.type) {
    case 'updateUsername': {
      const username: string = action.message;
      return { ...state, username };
    }
    default:
      return state;
  }
};
export default user;
