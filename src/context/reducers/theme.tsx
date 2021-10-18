import { Action } from '../interfaces';

const theme = (state: { light: boolean }, action: Action) => ({
  ...state,
  light: !action.message,
});
export default theme;
