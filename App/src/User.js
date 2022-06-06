import React, {useState} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

function User() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [code, setCode] = useState(-1);
    const [state, setState] = useState('');
    let items = []

    const handleClose = () => {
        setCode(-1)
        setState('')
    }

    const showMessage = () => {
        if (code !== 200 && code !== -1) {
            return (<Message handleClose={handleClose} code={code} state={state.message}/>)
        } else return null
    }

    const getUserInfo = () => {
        setUsername(localStorage.getItem('username'))
        setToken(localStorage.getItem('token'))
        fetch(`http://127.0.0.1:5000/user/${username}`, {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + token
        },
        }).then(response => {
            if (response.status === 200) return response.json();
            else {
                setCode(response.status);
                response.json().then( message => setState(message) )
            }
        }).then(data => {
            navigate('/user/info', {
                state: {
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    username: data.username,
                    password: atob(unescape(decodeURIComponent(data.password)))
                }
            });
            return data;
        }).catch(error => {
            return error;
        });
    }

    const getItems = () => {
        fetch('http://127.0.0.1:5000/items', {
            method: 'POST'
        }).then(response => {
            response.json().then(result => {
                items = items.concat(result)
            })
        }).catch(error => {
            return error;
        });
    }

    const getOrdersList = () => {
        getItems()
        setUsername(localStorage.getItem('username'))
        setToken(localStorage.getItem('token'))
        fetch('http://127.0.0.1:5000/orders', {
            method: 'POST',
            headers: {
            'Authorization': 'Bearer ' + token
        },
        }).then(response => {
            response.json().then(result => {
                result = result.filter(function( obj ) {
                    for (let i = 0; i < items.length; i++){
                        if (items[i].item_id === obj.item_id) {
                            obj.name = items[i].name
                            break
                        }
                    }
                    return true;
                })
                navigate('/user/cart', {
                    state: {
                        orders: result
                    }
                });
            })
        }).catch(error => {
            return error;
        });
    }

    const logout = () => {
        setUsername('')
        setToken('')
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        navigate('/login')
    }

    const deleteUser = () => {
        setUsername(localStorage.getItem('username'))
        setToken(localStorage.getItem('token'))
        fetch(`http://127.0.0.1:5000/user/${username}`, {
            method: 'DELETE',
            headers: {
            'Authorization': 'Bearer ' + token
        },
        }).then(response => {
            if (response.status === 200)
            {
                logout()
                return response.json();
            }
            else {
                setCode(response.status);
                response.json().then( message => setState(message) )
            }
        }).catch(error => {
            return error;
        });
    };

    return (
        <div>
            {showMessage()}
            {Navbar()}
            <div className="main">
                <div className="account-full login-full">
                    <div className="account-inner login-inner">
                        <h1 className="verification-text">User Panel</h1>
                        <button type="button" className="account-btn more-btn" id="user-info-btn" onClick={getUserInfo}>User info</button>
                        <button type="button" className="account-btn more-btn" onClick={getOrdersList}>Shopping cart</button>
                        <button type="button" className="account-btn more-btn" id="logout" onClick={logout}>Log out</button>
                        <button type="button" className="account-btn more-btn" onClick={deleteUser}>Delete account</button>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default User;