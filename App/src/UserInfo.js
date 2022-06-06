import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import './styles/style.css'
import Navbar from './Navbar';
import Footer from './Footer';
import backBtn from './images/back-button-icon.png';
import Message from './Message';
import { useNavigate } from 'react-router-dom';


function UserInfo (props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [firstName, setFirstName] = useState(location.state.firstName);
    const [lastName, setLastName] = useState(location.state.lastName);
    const [email, setEmail] = useState(location.state.email);
    const [username, setUsername] = useState(location.state.username);
    const [password, setPassword] = useState(location.state.password);
    const [code, setCode] = useState(-1);
    const [state, setState] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [checked, setChecked] = useState(false);
    const [messageShow, setMessageShow] = useState(false);

    const changePasswordState = () => {
        setChecked(!checked);
    }

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

    const updateUser = () => {
        setUsername(localStorage.getItem('username'));
        setToken(localStorage.getItem('token'));
        fetch(`http://127.0.0.1:5000/user/info/${localStorage.getItem('username')}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }),
            }).then(response => {
                if (response.status === 200) return response.json();
                else {
                    setCode(response.status);
                    response.json().then( message => setState(message) );
                    setMessageShow(true);
                }
            }).then(data => {
                localStorage.setItem('token', data.token);
                if (username === 'admin') {
                    localStorage.setItem('username', 'admin');
                } else {
                    localStorage.setItem('username', username);
                }
                navigate(`/user/info`, {
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

    return (
        <div>
            {Navbar()}
            {showMessage()}
            <div className='main' id='user-info'>
                <div className='user-info-full login-full'>
                    <div className='user-info-inner login-inner'>
                        <div className='title-section'>
                            <Link to={'/user'}><img className='back-btn' src={backBtn} alt=''/></Link>
                            <h1 className='verification-text'>User Info</h1>
                        </div>
                        <div className='user-info-input-wrapper login-input-wrapper'>
                            <div className='login-input-container'>
                                <label htmlFor='username' className='input-field-name'>Username</label>
                                <input disabled={messageShow} id='username' className='input-field' size='30' defaultValue={username} onChange={(e) => {setUsername(e.target.value)}} required/>
                            </div>
                            <div className='login-input-container'>
                                <label htmlFor='first_name' className='input-field-name'>First name</label>
                                <input disabled={messageShow} id='first_name' className='input-field' size='30' defaultValue={firstName} onChange={(e) => {setFirstName(e.target.value)}} required/>
                            </div>
                            <div className='login-input-container'>
                                <label htmlFor='last_name' className='input-field-name'>Last name</label>
                                <input disabled={messageShow} id='last_name' className='input-field' size='30' defaultValue={lastName} onChange={(e) => {setLastName(e.target.value)}} required/>
                            </div>
                            <div className='login-input-container'>
                                <label htmlFor='email' className='input-field-name'>Email</label>
                                <input disabled={messageShow} type='email' id='email' className='input-field' size='30' defaultValue={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                            </div>
                            <div className='login-input-container'>
                                <label htmlFor='password' className='input-field-name'>Password
                                    <label className='footer-text' id='showPasswordBtn'>
                                        <input disabled={messageShow} type='checkbox' checked={checked} onChange={changePasswordState} />
                                            Show password
                                    </label>
                                </label>
                                <input disabled={messageShow} type={checked ? 'text' : 'password'} id='password' className='input-field' name='password'
                                       minLength='8' defaultValue={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className='admin-btn login-btn-wrapper'>
                            <button disabled={messageShow} className='login-btn' onClick={updateUser}>UPDATE</button>
                        </div>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default UserInfo;