import { Server } from '../Types';

type State = Server[];

type Action = {
  type: string;
  message: Server;
};

const deleteServerFromDataBase = (name: string) => {
  fetch('/api/servers', {
    method: 'DELETE',
    body: JSON.stringify({ name }),
    'Content-Type': 'application/json',
  });
};

const postServerToDataBase = (
  name: string,
  endpoint: string,
  PORT: string,
  username: string,
  password: string
) => {
  fetch('/api/servers', {
    method: 'POST',
    body: JSON.stringify({ name, endpoint, PORT, username, password }),
    'Content-Type': 'application/json',
  });
};

const servers = (state: State, action: Action) => {
  const server: Server = action.message;
  const newServerList = state.slice();
  switch (action.type) {
    case 'addServer': {
      newServerList.push(server);
      postServerToDataBase(
        server.name,
        server.endpoint,
        server.port,
        server.username,
        server.password
      );
      return newServerList;
    }
    case 'deleteServer': {
      if (!server) return state;
      deleteServerFromDataBase(server.name);
      return newServerList.filter((elem) => elem.name !== server.name);
    }
    case 'populateList': {
      if (!newServerList.includes(server)) return newServerList.concat(server);
      return newServerList;
    }

    default:
      return state;
  }
};

export default servers;
