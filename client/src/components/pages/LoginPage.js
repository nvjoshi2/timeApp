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
        <div>
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
                <label>
                    username: 
                    <input type="text" value={state.username} onChange={handleUsernameChange}/>
                </label>
            </form>

            <form onSubmit = {handleSubmit}>
                <label>
                    password: 
                    <input type="password" value={state.password} onChange={handlePasswordChange}/>
                </label>
            </form>
            

            <input type="button" value="submit" onClick={handleSubmit}/>
            <input type="button" value="register" onClick={() => history.push('/register')}/>
        </div>
    )
}

export default LoginPage;