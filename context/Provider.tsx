import { createContext, useReducer } from "react";
import initialStateUser from "./initialStates/initialStateUser";
import user from './reducers/user';

export const GlobalContext = createContext({}); //the provider needs to fill the state
export const GlobalProvider = ({children})=>{
    const [userState,userDispatch]:[any,any] = useReducer(user,initialStateUser);
    return <GlobalContext.Provider value={{userState,userDispatch}}>{children}</GlobalContext.Provider>;
};
