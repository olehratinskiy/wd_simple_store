import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import './styles/style.css';
import Navbar from './Navbar';
import Footer from './Footer';
import backBtn from './images/back-button-icon.png';
import Message from './Message';

function UserCart (props) {
    const location = useLocation();
    const [orders, setProducts] = useState(location.state.orders);
    const [code, setCode] = useState(-1);
    const [state, setState] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [selectedRowId, setSelectedRowId] = useState(-1);

    const handleClose = () => {
        setCode(-1);
        setState('');
    }

    const showMessage = () => {
        if (code !== 200 && code !== -1) {
            return (<Message handleClose={handleClose} code={code} state={state.message}/>);
        } else return null;
    }

    const deleteOrder = () => {
        setToken(localStorage.getItem('token'))
        fetch(`http://127.0.0.1:5000/order/${selectedRowId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': 'Bearer ' + token
        },
        }).then(response => {
            if (response.status === 200) {
                setProducts(
                    orders.filter(function( obj ) {
                        return obj.order_id !== selectedRowId;
                    })
                )
                return response.json();
            }
            else {
                setCode(response.status);
                response.json().then( message => setState(message) );
            }
        }).catch(error => {
            return error;
        });
    }

    return (
        <div>
            {Navbar()}
            {showMessage()}
            <div className='main' id='delete'>
                <div className='user-cart-full login-full'>
                    <div className='user-cart-inner login-inner'>
                        <div className='title-section'>
                            <Link to={'/user'}><img className='back-btn' src={backBtn} alt=''/></Link>
                            <h1 className='verification-text'>Shopping Cart</h1>
                        </div>

                        <table id='table'>
                            <tbody>
                                <tr>
                                    <td>Order ID</td>
                                    <td>Name</td>
                                    <td>Quantity</td>
                                    <td>Price</td>
                                </tr>

                                {orders ? orders.map( ( {order_id, name, item_quantity, price} ) => {
                                    return (
                                        <tr className={order_id === selectedRowId ? 'selected' : null} key={order_id} onClick={(e) => {
                                            e.target.parentNode.className === 'selected' ? setSelectedRowId(-1) : setSelectedRowId(order_id)
                                        }}>
                                            <td className='row-data'>{order_id}</td>
                                            <td className='row-data'>{name}</td>
                                            <td className='row-data'>{item_quantity}</td>
                                            <td className='row-data'>{price} UAH</td>
                                        </tr>
                                    )
                                }) : null}
                            </tbody>
                        </table>
                        <input type='button' className='more-btn' value='DELETE ORDER' onClick={deleteOrder}/>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default UserCart;