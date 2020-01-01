import React, { useContext } from 'react';
import { store } from '../../store/store';

const Home = () => {
    const state = useContext(store);
    console.log('2', state.state);
    const { user } = state;
    console.log(user)
    return (
        <>
            <h1>Home</h1>
            <h2>{(user && user.email) ? user.email : null}</h2>
        </>
    );
}

export default Home;
