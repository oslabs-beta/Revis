import { CurrentServer, ActionCurrentServer } from '../interfaces';

const currentServer = (state: CurrentServer, action: ActionCurrentServer) => {
  const currentInfo: CurrentServer = action.message;
  const newServer = state;
  const { name, endpoint, port, password } = currentInfo;

  switch (action.type) {
    case 'currentServer':
      return { ...newServer, name, endpoint, port, password };

    default:
      return state;
  }
};

export default currentServer;
