import React, { Component, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../../actions/authActions';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
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
        axios.post('/api/users/register', credentials)
            .then(res => {
                dispatch(logIn(username, password))
            })
            .catch(err => {
                console.log('That username is taken');
            })

    }
    return(
        <div>
            <h1>Register</h1>
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
            

            <input type="button" value="submit" onClick={handleSubmit}/>
        </div>
    )
}

export default RegisterPage;