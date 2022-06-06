import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './styles/style.css'
import Navbar from './Navbar';
import Footer from './Footer';
import Message from './Message';
import backBtn from './images/back-button-icon.png';


function Login() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState(-1);
    const [state, setState] = useState('');
    const [messageShow, setMessageShow] = useState(false);
    const navigate = useNavigate();

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

    const loadUserPage = () => {
        navigate(`/user`);
    }

    const registerUser = () => {
        fetch('http://127.0.0.1:5000/user', {
            method: 'POST',
            headers: {
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
            localStorage.setItem('username', username);
            loadUserPage();
            return data;
        }).catch(error => {
            return error;
        });
    };

    return (
        <div>
            {Navbar()}
            {showMessage()}
            <div className='main' id='signup'>
                <div className='signup-full'>
                    <div className='signup-inner'>
                        <div className='title-section'>
                            <Link to={'/login'}><img className='back-btn' src={backBtn} alt=''/></Link>
                            <h1 className='verification-text'>Sign Up</h1>
                        </div>
                        <form name='signup-form' className='signup-inner-wrapper' method='post'>
                            <div className='signup-input-wrapper'>
                                <div className='signup-input-container'>
                                    <label htmlFor='firstname' className='input-field-name'>First name</label>
                                    <input disabled={messageShow} id='firstname' className='input-field' value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                                </div>
                                <div className='signup-input-container'>
                                    <label htmlFor='lastname' className='input-field-name'>Last name</label>
                                    <input disabled={messageShow} id='lastname' className='input-field' value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                </div>
                                <div className='signup-input-container'>
                                    <label htmlFor='email' className='input-field-name'>Email</label>
                                    <input disabled={messageShow} type='email' id='email' className='input-field' size='30' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                            </div>

                            <div className='signup-input-wrapper'>
                                <div className='signup-input-container'>
                                    <label htmlFor='username' className='input-field-name'>Username</label>
                                    <input disabled={messageShow} id='username' className='input-field' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                </div>
                                <div className='signup-input-container'>
                                    <label htmlFor='password' className='input-field-name'>Password</label>
                                    <input disabled={messageShow} type='password' id='password' className='input-field' name='password'
                                           minLength='8' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                                <button disabled={messageShow} onClick={registerUser} type='button' className='signup-btn'>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {Footer()}
        </div>
    );
}

export default Login;