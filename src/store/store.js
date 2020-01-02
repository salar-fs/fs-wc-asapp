import React, { createContext, useReducer } from 'react';

const getAppState = () => {
    let user = {};
    const persistentUser = localStorage.getItem('user');
    user = persistentUser ? JSON.parse(persistentUser) : {};
    return {
        user
    };
};

const initialState = getAppState();
// create store
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'USER_LOGIN':
                return doLogin(state, action);
            case 'USER_LOGOUT':
                return doLogout(state, action);
            default:
                throw new Error('Action not specified');
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>
};
const doLogin = (state, action) => {
    const user = {
        email: action.payload.email,
        isAuthenticated: true
    };
    // persist user
    localStorage.setItem('user', JSON.stringify(user));
    const newState = { ...state };
    newState.user = user;
    return newState;
};

const doLogout = (state, action) => {
    const user = {};
    localStorage.setItem('user', JSON.stringify(user));
    const newState = { ...state };
    newState.user = user;
    return newState;
};

export { store, StateProvider };
