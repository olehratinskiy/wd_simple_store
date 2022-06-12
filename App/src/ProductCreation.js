import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './styles/style.css';
import Navbar from './Navbar';
import Footer from './Footer';
import backBtn from './images/back-button-icon.png';
import Message from './Message';


function ProductCreation () {
    const [code, setCode] = useState(-1);
    const [state, setState] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [messageShow, setMessageShow] = useState(false);
    const [name, setName] = useState('');
    const [storageQuantity, setStorageQuantity] = useState('');
    const [price, setPrice] = useState('');


    const handleClose = () => {
        setCode(-1);
        setState('');
        setMessageShow(false);
    }

    const showMessage = () => {
        if (code !== 200 && code !== -1) {
            return (<Message handleClose={handleClose} code={code} state={state.message}/>);
        } else return null;
    }

    const createProduct = () => {
        setToken(localStorage.getItem('token'));
        fetch(`http://127.0.0.1:5000/item`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                storage_quantity: storageQuantity,
                price: price,
                status: 'available'
            }),
            }).then(response => {
                if (response.status === 200) {
                    setName('');
                    setStorageQuantity('');
                    setPrice('');
                    return response.json();
                }
                else {
                    setCode(response.status);
                    response.json().then( message => setState(message) )

                    setMessageShow(true);
                }
            }).catch(error => {
                return error;
            });
        }

    return (
        <div>
            {Navbar()}
            {showMessage()}
            <div className='main'>
                <div className='login-full'>
                    <div className='add-item-inner login-inner'>
                        <div className='title-section'>
                            <Link to={'/admin'}><img className='back-btn' src={backBtn} alt=''/></Link>
                            <h1 className='verification-text'>Add Product</h1>
                        </div>
                        <div className='add-item-input-wrapper login-input-wrapper'>
                            <div className='login-input-container'>
                                <label htmlFor='name' className='input-field-name'>Name</label>
                                <input disabled={messageShow} id='name' value={name} className='input-field' size='30' onChange={(e) => {setName(e.target.value)}} required/>
                            </div>
                            <div className='login-input-container'>
                                <label htmlFor='quantity' className='input-field-name'>Quantity</label>
                                <input disabled={messageShow} id='quantity' value={storageQuantity} className='input-field' size='30' onChange={(e) => {setStorageQuantity(e.target.value)}} required/>
                            </div>
                            <div className='login-input-container'>
                                <label htmlFor='price' className='input-field-name'>Price</label>
                                <input disabled={messageShow} id='price' value={price} className='input-field' size='30' onChange={(e) => {setPrice(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className='admin-btn login-btn-wrapper'>
                            <button disabled={messageShow} className='login-btn' onClick={createProduct}>ADD</button>
                        </div>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default ProductCreation;