import currentServer from '../../src/context/reducers/currentServer';
import { CURRENT_SERVER } from '../../src/context/constants/actionTypes';

describe('Current server reducer function', () => {
  test('should update the current server information', () => {
    const selectedServerState = {
      name: 'Test Server',
      endpoint: 'Test Endpoint',
      password: 'test password',
      port: 'test port',
    };

    const updatedServerState = {
      name: 'Updated Server',
      endpoint: 'Updated Endpoint',
      password: 'Updated password',
      port: 'Updated port',
    };

    const action = {
      type: CURRENT_SERVER,
      message: updatedServerState,
    };

    const updatedState = currentServer(selectedServerState, action);

    expect(updatedState).toEqual(updatedServerState);
  });
});
