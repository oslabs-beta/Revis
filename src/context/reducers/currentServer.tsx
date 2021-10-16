import { CurrentServer, ActionCurrentServer } from '../interfaces';

const currentServer = (state: CurrentServer, action: ActionCurrentServer) => {
  const currentInfo: CurrentServer = action.message;
  const newServer = state;
  const { name, endpoint, sessionToken } = currentInfo;
  let password;
  let port;

  switch (action.type) {
    case 'currentServer':
      if (endpoint === 'redis-18891.c9.us-east-1-4.ec2.cloud.redislabs.com') {
        password = 'Etttmq5T4ubqnE6TaYltcjXmdobQAjfq';
        port = 18891;
      } else {
        password = 'redis';
        port = 16424;
      }
      return { ...newServer, name, endpoint, password, port, sessionToken };

    default:
      return state;
  }
};

export default currentServer;
