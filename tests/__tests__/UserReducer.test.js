import user from '../../src/context/reducers/user';
import { UPDATE_USERNAME } from '../../src/context/constants/actionTypes';

describe('User reducer tests: ', () => {
  it('should update the username', () => {
    const updatedUsername = 'UpdatedUser';
    const action = { type: UPDATE_USERNAME, message: updatedUsername };
    const userReducerResult = user('', action);

    expect(updatedUsername).toEqual(userReducerResult.username);
  });
});
