const user = (state, action) => {
    switch (action.type) {
      case 'addServer': {
        const server = action.message;
        const newServerList = state.serverList.slice();
        console.log(state);
        newServerList.push(server);
        return { serverList: {serverList: newServerList }};
      }
      default:
        return state;
    }
  };
  export default user;