import React, { createContext, useReducer } from 'react';

const initialState = {
    user: {}
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'USER_LOGIN':
                console.log(state, action);
                const user = { email: action.payload.email };
                const newState = { ...state };
                newState.user = user;
                console.log('1', newState);
                return newState;
            default:
                throw new Error('Action not specified');
                break;
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>
};

export { store, StateProvider };
