const metrics = (state, action) => {
  const metricsUpdated: any = action.message;

  switch (action.type) {
    case "updateMetrics":
      return { ...state, metricsUpdated };
    default:
      return state;
  }
};
export default metrics;
