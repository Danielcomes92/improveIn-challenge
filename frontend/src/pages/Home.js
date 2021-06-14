import React, { useState } from 'react'

import Header from '../components/Header';
import CardsContainer from '../components/CardsContainer';

const Home = () => {
    const [data, setData] = useState([])

    return (
        <div className="mainHomeContainer">
            <Header setData={ setData } data={ data }/>
            <CardsContainer data={ data } />
            
        </div>
    )
}
export default Home;