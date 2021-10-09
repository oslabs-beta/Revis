const metrics = (state, action) => {
  const metricsUpdated: any = action.message;

  switch (action.type) {
    case "updateMetrics":
      return { ...state, metricsUpdated };
      // const newState = Object.assign({}, state, metricsUpdated);
      return newState;
    default:
      return state;
  }
};
export default metrics;
