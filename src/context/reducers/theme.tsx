const theme = (state: { light: boolean }, action: { message: boolean }) => ({
  ...state,
  light: !action.message,
});
export default theme;
