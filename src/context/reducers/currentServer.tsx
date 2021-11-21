import { CurrentServer, ActionCurrentServer } from '../interfaces';
import { CURRENT_SERVER } from '../constants/actionTypes';

const currentServer = (state: CurrentServer, action: ActionCurrentServer) => {
  const currentInfo: CurrentServer = action.message;
  const newServer = state;
  const { name, endpoint, port, password } = currentInfo;

  switch (action.type) {
    case CURRENT_SERVER:
      return { ...newServer, name, endpoint, port, password };

    default:
      return state;
  }
};

export default currentServer;
