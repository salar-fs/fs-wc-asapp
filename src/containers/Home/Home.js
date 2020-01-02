import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Products from '../../components/Products/Products';
import items from '../../data/products';

const Home = (props) => {

    return (
        <>
            <NavBar />
            <Products items={items}/>
        </>
    );
}

export default Home;
