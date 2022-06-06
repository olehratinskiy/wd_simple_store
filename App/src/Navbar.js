import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from './images/shopping-cart.png';
import menu from './images/closed-menu-icon.png';

function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setLogin] = useState();
    const [username, setUsername] = useState();
    const [headerHeight, setHeaderHeight] = useState('65px');
    const [menuShowStyle, setMenuShowStyle] = useState('');
    const [hidden, setHidden] = useState(true);

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

    useEffect(() => {
        if (localStorage.getItem('username') !== null) {
            setUsername(localStorage.getItem('username'));
            setLogin(true);
        } else {
            setLogin(false);
        }
    });

    const getAccountPath = () => {
        if (isLoggedIn) {
            if (username.toString() === 'admin') {
                return '/admin';
            } else {
                return '/user';
            }
        }
        return '/login';
    }

    const showMenu = () => {
        if (hidden === true) {
            setHeaderHeight('160px');
            setMenuShowStyle('flex');
            setHidden(false);
        } else {
            setHeaderHeight('65px');
            setMenuShowStyle('');
            setHidden(true);
        }
    }

    return (
        <nav>
            <header>
                <div className='header-full' style={{height: headerHeight}}>
                    <div className='header-inner'>
                        <span className='logo-name'>
                            <Link to={'/home'}><img src={logo} className='shopcart-img' alt=''/></Link>
                            <Link to={'/home'} className='menu-text'>Bakery Store</Link>
                        </span>
                        <img src={menu} className='menu-hidden' alt='' onClick={showMenu}/>
                        <span className='menu' style={{display: menuShowStyle}}>
                            <Link to={'/home'} className='menu-text page' id='home-link'>Home</Link>
                            <p onClick={getProductsList} className='menu-text page' id='products-link'>Products</p>
                            <Link to={getAccountPath()} className='menu-text page' id='account-link'>Account</Link>
                        </span>
                    </div>
                </div>
            </header>

            <div className='header-placeholder' aria-hidden='true' style={{height: headerHeight}}/>
        </nav>
    );
}

export default Navbar;
