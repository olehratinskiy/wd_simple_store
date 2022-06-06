import React, {useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {Link, useNavigate} from 'react-router-dom';
import Message from './Message';

function Admin() {
    const navigate = useNavigate();
    const [code, setCode] = useState(-1);
    const [state, setState] = useState('');

    const handleClose = () => {
        setCode(-1);
        setState('');
    }

    const showMessage = () => {
        if (code !== 200 && code !== -1) {
            return (<Message handleClose={handleClose} code={code} state={state.message}/>);
        } else return null;
    }

    const getItems = () => {
        fetch('http://127.0.0.1:5000/items', {
            method: 'POST'
        }).then(response => {
            response.json().then(result => {
                navigate('/admin/delete-product', {
                    state: {
                        products: result
                    }
                });
            })
        }).catch(error => {
            return error;
        });
    }

    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            {showMessage()}
            {Navbar()}
            <div className='main'>
                <div className='account-full login-full'>
                    <div className='account-inner login-inner'>
                        <h1 className='verification-text'>Admin Panel</h1>
                        <Link to={'/admin/add-product'}><button className='account-btn more-btn'>Add product</button></Link>
                        <Link to={'/admin/edit-product'}><button className='account-btn more-btn'>Update product</button></Link>
                        <button className='account-btn more-btn' onClick={getItems}>Delete product</button>
                        <button type='button' className='account-btn more-btn' id='logout' onClick={logout}>Log out</button>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default Admin;