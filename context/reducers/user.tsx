const user = (state, action) => {
  switch (action.type) {
    case 'updateUsername': {
      const username = action.message;
      return { ...state, username };
    }
    default:
      return state;
  }
};
export default user;
