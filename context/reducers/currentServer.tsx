import { CurrentServer } from '../Types';

type State = CurrentServer[];

type Action = {
  type: string;
  payload: CurrentServer;
};

const currentServer = (state: State, action: Action) => {
  const currentInfo: CurrentServer = action.payload;
  const newServer = state;
  const { endpoint, password, port, sessionToken } = currentInfo;
  switch (action.type) {
    case 'currentServer':
      return { ...newServer, endpoint, password, port, sessionToken };

    default:
      return state;
  }
};

export default currentServer;
