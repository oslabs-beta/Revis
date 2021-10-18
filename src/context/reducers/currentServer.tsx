import { CurrentServer, ActionCurrentServer } from '../interfaces';

const currentServer = (state: CurrentServer, action: ActionCurrentServer) => {
  const currentInfo: CurrentServer = action.message;
  const newServer = state;
  const { name, endpoint, port } = currentInfo;

  /* Chao server:
  redis-18891.c9.us-east-1-4.ec2.cloud.redislabs.com
  18891
  Etttmq5T4ubqnE6TaYltcjXmdobQAjfq

 Liam:
  redis-10027.c238.us-central1-2.gce.cloud.redislabs.com
  10027
  91Ue9aQc1mReFlL36CGd3gK3wALASFxF

  */

  // Server provides user with session key
  // check if request matches session key
  // if yes, respond with pw
  switch (action.type) {
    case 'currentServer':
      // fetch password for selected server based on user_id, name, endpont

      fetch('/api/validateUser', {
        method: 'POST',
        body: JSON.stringify({ endpoint }),
        'Content-Type': 'application/json',
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      return { ...newServer, name, endpoint, port };

    default:
      return state;
  }
};

export default currentServer;
