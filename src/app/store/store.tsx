import React, {createContext, Dispatch, useReducer} from "react";
import Reducer, {StateContext} from './reducer'

interface IContextProps {
    state: StateContext;
    dispatch: ({type}:{type:string, data: any}) => void;
  }

const initialState = {
    QRs: [],
    error: 'error',
    alerts: [],
    user: '',
};

export const Context = React.createContext({} as IContextProps);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const value = { state, dispatch };
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
};

export default Store;