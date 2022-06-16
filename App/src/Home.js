import React from 'react';
import './styles/style.css'
import Navbar from './Navbar';
import Footer from './Footer';
import homeProducts from './images/home-products.jpg';
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const getProductsList = () => {
        fetch('http://127.0.0.1:5000/items', {
            method: 'POST'
        }).then(response => {
            response.json().then(result => {
                navigate('/products', {
                    state: {
                        products: result
                    }
                });
            })
        }).catch(error => {
            return error;
        });
    }

    return (
        <div>
            {Navbar()}
            <div className='main' id='home'>
                <div className='greeting-section'>
                    <h1 className='greeting-section-text'>WELCOME TO OUR <br/>SIMPLE BAKERY <br/>STORE WEBSITE</h1>
                    <h1 className='greeting-section-text' id='hidden-greeting'>BAKERY STORE WEBSITE</h1>
                    <div className='greeting-section-more'>
                        <img src={homeProducts} alt=''/>
                            <h2 className='see-more-text'>Here you can buy any type of food made from wheat</h2>
                            <button type='button' className='more-btn' id='home-btn' onClick={getProductsList}>See more</button>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default Home;