import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./styles/style.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import Message from "./Message";
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState(-1);
    const [state, setState] = useState('');
    const [messageShow, setMessageShow] = useState(false)
    const navigate = useNavigate();

    const handleClose = () => {
        setCode(-1)
        setState('')
        setMessageShow(false)
    }

    const showMessage = () => {
        if (code !== 200 && code !== -1) {
            return (<Message handleClose={handleClose} code={code} state={state.message}/>)
        } else return null
    }

    const loadUserPage = () => {
        navigate('/user')
    }

    const loadAdminPage = () => {
        navigate('/admin')
    }

    const loginUser = () => {
        fetch('http://127.0.0.1:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        }).then(response => {
            if (response.status === 200) return response.json();
            else {
                setCode(response.status);
                response.json().then( message => setState(message) )
                setMessageShow(true)
            }
        }).then(data => {
            localStorage.setItem('token', data.token);
            if (username === 'admin') {
                localStorage.setItem('username', 'admin');
                loadAdminPage()
            } else {
                localStorage.setItem('username', username);
                loadUserPage()
            }
            return data;
        }).catch(error => {
            return error;
        });
    };

    return (
        <div>
            {Navbar()}
            {showMessage()}
            <div className="main" id="login">
                <div className="login-full">
                    <div className="login-inner">
                        <h1 className="verification-text">Login</h1>
                        <div className="login-input-wrapper">
                            <div className="login-input-container">
                                <label htmlFor="username" className="input-field-name">Username</label>
                                <input disabled={messageShow} id="username" className="input-field" size="30" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                            </div>
                            <div className="login-input-container">
                                <label htmlFor="password" className="input-field-name">Password</label>
                                <input disabled={messageShow} type="password" id="password" className="input-field" name="password" minLength="8" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="login-btn-wrapper">
                            <button disabled={messageShow} onClick={loginUser} type="button" className="login-btn">Login</button>
                            <h3 className="footer-text" id="signup-link"> Don’t have an account? <Link to={"/register"}><u>Sign Up</u></Link></h3>
                        </div>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    );
}

export default Login;