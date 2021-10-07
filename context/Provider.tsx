import { createContext, useReducer, useContext } from "react";
import initialStateUser from "./initialStates/initialStateUser";
import user from "./reducers/user";
import metrics from "./reducers/metrics";
import initialStateMetrics from "./initialStates/initialStateMetrics";

export const GlobalContext = createContext({}); //the provider needs to fill the state
export const GlobalProvider = ({ children }) => {
  const [userState, userDispatch]: [any, any] = useReducer(
    user,
    initialStateUser
  );
  const [metricState, metricsDispatch]: [any, any] = useReducer(
    metrics,
    initialStateMetrics
  );
  return (
    <GlobalContext.Provider
      value={{ user: {userState, userDispatch }, metricsStore: {metricState, metricsDispatch} }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useStore = () => useContext(GlobalContext);
