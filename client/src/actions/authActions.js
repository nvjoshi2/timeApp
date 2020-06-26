import axios from 'axios';
import React from 'react';
import { LOG_IN , LOG_OUT} from './types'
import { Link, useHistory } from 'react-router-dom';
import history from '../history';
import {getTasks} from './taskActions';
import { BACKEND_URL } from './backendUrl';
import fetch from 'cross-fetch';
export const logIn = (username, password) => dispatch => {
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
        .catch(err => console.log(err.response))
};

export const logOut = () => dispatch => {
    console.log('action logOut called')
    dispatch({
        type: LOG_OUT
    })
};

