import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../actions/authActions';
import { useHistory } from 'react-router-dom';
import { CLEAR_LOGIN_MESSAGE, LOG_IN } from '../../actions/types';
import {BACKEND_URL} from '../../actions/backendUrl';
import axios from 'axios';

function LoginPage(props) {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const [usernameMessage, setUsernameMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')

    const history = useHistory();


    const dispatch = useDispatch();
    const handleUsernameChange = (event) => {
        setState({
            username: event.target.value,
            password: state.password
        })
    }
    const handlePasswordChange = (event) => {
        setState({
            username: state.username,
            password: event.target.value
        })
    }
    const handleSubmit = (event) => {
        // what do i want this to do?
        // 1st, search database for 
        // console.log('hahahaha')
        logIn(state.username, state.password)
    }

    const logIn = async (username, password) => {
        console.log('logIn called')
        const credentials = {
            username,
            password
        }
    
        axios
            .post(`${BACKEND_URL}/api/users/login`, credentials)
            .then(res => {
                dispatch({
                    type: LOG_IN,
                    payload: res.data
                });
                history.push('/home')
    
            })
            .catch(err => {
                const status = err.response.status;
                if (status == 401) {
                    setPasswordMessage('wrong password')
                } else if (status == 404) {
                    setUsernameMessage('no user found with given username')
                } else {
                    console.log(err)
                }
            })
    };

    return(
        // <div className='page-container'>
        //     <div className = 'login' style = {{flexGrow:1}}>
        //     <h1>Login</h1>
        //     <form >
        //         <label>
        //             username: 
        //             <input type="text" value={state.username} onChange={handleUsernameChange}/>
        //         </label>
        //     </form>

        //     <form >
        //         <label>
        //             password: 
        //             <input type="password" value={state.password} onChange={handlePasswordChange}/>
        //         </label>
        //     </form>
        //     </div>

            

        //     <input type="button" value="submit" onClick={handleSubmit}/>
        //     {/* <input type="button" value="register" onClick={() => history.push('/register')}/> */}
        // </div>

        <div className='page-container form-page full-height-grow'>
            <form className = 'register-form'>
                <div className = 'input-group'>
                    <label>Username:</label>
                    <input  type='text' value={state.username} onChange={handleUsernameChange}/>
                    <label className = 'password-message'>{usernameMessage}</label>
                </div>
                <div className = 'input-group'>
                    <label>Password:</label >
                    <input  type='password' value={state.password}onChange={handlePasswordChange}/>
                    <label className = 'password-message'>{passwordMessage}</label>
                </div>
                <div className = 'input-group'>
                    <button type="button" className = 'join-button' onClick={handleSubmit}>Log In</button>
                    {/* <button type="button" className = 'dont-button'>DO NOT PRESS</button> */}
                </div>
            </form>
        </div>
    )
}

export default LoginPage;