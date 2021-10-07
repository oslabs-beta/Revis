const metrics = (state, action) => {
  switch (action.type) {
    case 'updateMetrics':
      const metrics = action.message;
      return {...state,metrics}; 
    default:
      return state;
  }
};
export default metrics;
