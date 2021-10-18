import { CurrentServer, ActionCurrentServer } from '../interfaces';

const currentServer = (state: CurrentServer, action: ActionCurrentServer) => {
  const currentInfo: CurrentServer = action.message;
  const newServer = state;
  const { name, endpoint, sessionToken } = currentInfo;
  let password;
  let port;

  console.log(currentInfo);

  /* Chao server:
  "redis-18891.c9.us-east-1-4.ec2.cloud.redislabs.com"
  18891
  Etttmq5T4ubqnE6TaYltcjXmdobQAjfq

 Liam:
  redis-10027.c238.us-central1-2.gce.cloud.redislabs.com
  10027
  91Ue9aQc1mReFlL36CGd3gK3wALASFxF

  */
  switch (action.type) {
    case 'currentServer':
      // fetch password for selected server based on user_id, name, endpont
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
