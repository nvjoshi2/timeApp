import React, { Component, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../../actions/authActions';
import { Link, useHistory } from 'react-router-dom';

function LoginPage(props) {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const history = useHistory()
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
        dispatch(logIn(state.username, state.password))
    }

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
                </div>
                <div className = 'input-group'>
                    <label>Password:</label >
                    <input  type='password' value={state.password}onChange={handlePasswordChange}/>
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