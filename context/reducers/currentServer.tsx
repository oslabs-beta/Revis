import { CurrentServer } from "../Types";

type State = CurrentServer[];

type Action = {
  type: string;
  payload: CurrentServer;
};

const currentServer = (state: State, action: Action) => {
  const currentInfo: CurrentServer = action.payload;
  const newServer = state;
  // const { name, endpoint, password, port, sessionToken } = currentInfo;
  const { name, endpoint, sessionToken } = currentInfo;
  let password;
  let port;

  switch (action.type) {
    case "currentServer":
      if (endpoint === "redis-18891.c9.us-east-1-4.ec2.cloud.redislabs.com") {
        password = "Etttmq5T4ubqnE6TaYltcjXmdobQAjfq";
        port = 18891;
      } else {
        password = "redis";
        port = 16424;
      }

      console.log({
        ...newServer,
        name,
        endpoint,
        password,
        port,
        sessionToken,
      });
      return { ...newServer, name, endpoint, password, port, sessionToken };

    default:
      return state;
  }
};

export default currentServer;
