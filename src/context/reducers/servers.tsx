import { Server, ActionServerList } from '../interfaces';
import {
  DELETE_SERVER,
  ADD_SERVER,
  POPULATE_LIST,
} from '../constants/actionTypes';

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
  port: string,
  username: string,
  password: string
) => {
  fetch('/api/servers', {
    method: 'POST',
    body: JSON.stringify({ name, endpoint, port, username, password }),
    'Content-Type': 'application/json',
  });
};

const servers = (state: Server[], action: ActionServerList) => {
  const server: Server = action.message;
  const newServerList = state.slice();
  switch (action.type) {
    case ADD_SERVER: {
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
    case DELETE_SERVER: {
      if (!server) return state;
      deleteServerFromDataBase(server.name);
      return newServerList.filter((elem) => elem.name !== server.name);
    }
    case POPULATE_LIST: {
      if (!newServerList.includes(server)) return newServerList.concat(server);
      return newServerList;
    }

    default:
      return state;
  }
};

export default servers;
