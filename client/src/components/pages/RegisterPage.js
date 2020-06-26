import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../actions/authActions';
import axios from 'axios';
import './RegisterPage.css';
import { BACKEND_URL } from '../../actions/backendUrl';
const RegisterPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleSubmit = (event) => {
        addUser(username, password, email)
    }
    const addUser = (username, password, email) => {
        const credentials = {
            username,
            password,
            email
        }
        axios.post(`${BACKEND_URL}/api/users/register`, credentials)
            .then(res => {
                dispatch(logIn(username, password))
            })
            .catch(err => {
                console.log('That username is taken');
            })

    }
    return(
        <div className='page-container form-page full-height-grow'>
            <form className = 'register-form'>
                <div className = 'input-group'>
                    <label>Username:</label>
                    <input type='text' value={username} onChange={handleUsernameChange}/>
                </div>
                <div className = 'input-group'>
                    <label>Email:</label>
                    <input type='email' value={email} onChange={handleEmailChange}/>
                </div>
                <div className = 'input-group'>
                    <label>Password:</label >
                    <input type='password' value={password}onChange={handlePasswordChange}/>
                </div>
                <div className = 'input-group'>
                    <button type="button" className = 'join-button' onClick={handleSubmit}>Sign Up</button>
                </div>
            </form>


            {/* <h1>Register</h1>
            <form onSubmit = {handleSubmit}>
                <label>
                    username: 
                    <input type="text" value={username} onChange={handleUsernameChange}/>
                </label>
            </form>
            <form onSubmit = {handleSubmit}>
                <label>
                    email: 
                    <input type="text" value={email} onChange={handleEmailChange}/>
                </label>
            </form>

            <form onSubmit = {handleSubmit}>
                <label>
                    password: 
                    <input type="password" value={password} onChange={handlePasswordChange}/>
                </label>
            </form>
            

            <input type="button" value="submit" onClick={handleSubmit}/> */}
        </div>
    )
}

export default RegisterPage;