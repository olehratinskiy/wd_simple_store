import React, {useState} from 'react';
import './styles/style.css';
import Navbar from './Navbar';
import Footer from './Footer';
import {useLocation} from 'react-router-dom';
import Message from './Message';



function Products(props) {
    const location = useLocation();
    const [products, setProducts] = useState(location.state.products);
    let quantities = {};
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [token, setToken] = useState(localStorage.getItem('token'));
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

    const getUser = (itemId, itemQuantity, price) => {
        setUsername(localStorage.getItem('username'));
        setToken(localStorage.getItem('token'));
        if (username === null || username === 'admin') {
            setCode(403);
            setState({'message': 'You must be logged in user account to be able to make orders'});
        } else {
            fetch(`http://127.0.0.1:5000/user/${username}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            }).then(response => {
                if (response.status === 200) return response.json();
                else {
                    setCode(response.status);
                    response.json().then(message => setState(message));
                }
            }).then(data => {
                addOrder(itemId, data.user_id, itemQuantity, price)
                return data;
            }).catch(error => {
                return error;
            });
        }
    }

    const addOrder = (itemId, userId, itemQuantity, price) => {
        setUsername(localStorage.getItem('username'));
        setToken(localStorage.getItem('token'));
        if (username !== null && userId !== -1) {
            fetch(`http://127.0.0.1:5000/order`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    item_id: itemId,
                    item_quantity: itemQuantity,
                    price: parseFloat(price) * parseFloat(itemQuantity)
                }),
            }).then(response => {
                if (response.status === 200) {
                    setProducts(
                        products.filter(function( obj ) {
                            if (obj.item_id === itemId) {
                                obj.storage_quantity = parseFloat(obj.storage_quantity) - parseFloat(itemQuantity);
                                if (obj.storage_quantity === 0) {
                                    obj.status = 'sold out';
                                }
                            }
                            return true;
                        })
                    );
                    return response.json();
                } else {
                    setCode(response.status);
                    response.json().then(message => setState(message));
                }
            }).catch(error => {
                return error;
            });
        }
    }

    const getProductsStructure = (result, num) => {
        return (
            <div>
                {result[num] ? [result[num]].map( ( {item_id, name, storage_quantity, price, status} ) => {
                    quantities[item_id] === undefined ? quantities[item_id] = '1' : quantities[item_id] = quantities.item_id
                    return (
                    <div key={item_id} className='product'>
                        <h3>{name}</h3>
                        <h3 className='product-description'>Price: <span>{price}</span> UAH</h3>
                        <h3 className='product-description'>Status: {status}</h3>
                        <label className='product-description' htmlFor='1'>
                            Quantity ({storage_quantity}):
                            <input className='product-description product-quantity' id='1' defaultValue='1'  name='productQuantity' onChange={(e) => {quantities[item_id] = e.target.value}}/>
                        </label>
                        <button className='more-btn' onClick={() => getUser(item_id, quantities[item_id], price)}>Add to cart</button>
                    </div>
                )
                }) : <div className='product'><h3 className='product-comming-soon'>Product<br/>coming<br/>soon</h3></div>}
            </div>
        )
    }

    return (
        <div>
            {Navbar()}
            {showMessage()}
            <div className='main' id='products'>
                <h1 className='page-name'>Products</h1>
                <div className='products-table'>
                    <div className='products-row'>
                        <div className='products-pair'>
                            {getProductsStructure(products, 0)}
                            {getProductsStructure(products, 1)}
                        </div>
                        <div className='products-pair'>
                            {getProductsStructure(products, 2)}
                            {getProductsStructure(products, 3)}
                        </div>
                    </div>
                    <div className='products-row'>
                        <div className='products-pair'>
                            {getProductsStructure(products, 4)}
                            {getProductsStructure(products, 5)}
                        </div>
                        <div className='products-pair'>
                            {getProductsStructure(products, 6)}
                            {getProductsStructure(products, 7)}
                        </div>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default Products;