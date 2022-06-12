import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import './styles/style.css';
import Navbar from './Navbar';
import Footer from './Footer';
import backBtn from './images/back-button-icon.png';
import Message from './Message';


function ProductDeletion (props) {
    const location = useLocation();
    const [products, setProducts] = useState(location.state.products);
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

    const deleteProduct = () => {
        setToken(localStorage.getItem('token'))
        fetch(`http://127.0.0.1:5000/item/${selectedRowId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': 'Bearer ' + token
        },
        }).then(response => {
            if (response.status === 200)
            {
                setProducts(
                    products.filter(function( obj ) {
                        return obj.item_id !== selectedRowId;
                    })
                );
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
                <div className='admin-full-delete login-full'>
                    <div className='admin-inner-delete login-inner'>
                        <div className='title-section'>
                            <Link to={'/admin'}><img className='back-btn' src={backBtn} alt=''/></Link>
                            <h1 className='verification-text'>Delete Product</h1>
                        </div>

                        <table id='table'>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Quantity</td>
                                    <td>Price</td>
                                    <td>Status</td>
                                </tr>

                                {products ? products.map( ( {item_id, name, storage_quantity, price, status} ) => {
                                    return (
                                        <tr className={item_id === selectedRowId ? 'selected' : null} key={item_id} onClick={(e) => {
                                            e.target.parentNode.className === 'selected' ? setSelectedRowId(-1) : setSelectedRowId(item_id)
                                        }}>
                                            <td className='row-data'>{item_id}</td>
                                            <td className='row-data'>{name}</td>
                                            <td className='row-data'>{storage_quantity}</td>
                                            <td className='row-data'>{price} UAH</td>
                                            <td className='row-data'>{status}</td>
                                        </tr>
                                    )
                                }) : null}
                            </tbody>
                        </table>
                        <input type='button' className='more-btn' value='DELETE' onClick={deleteProduct}/>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default ProductDeletion;