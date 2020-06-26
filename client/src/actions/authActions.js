import axios from 'axios';
import React from 'react';
import { LOG_IN , LOG_OUT, WRONG_PASSWORD, NO_USER_FOUND, CLEAR_LOGIN_MESSAGE} from './types'
import { Link, useHistory } from 'react-router-dom';
import history from '../history';
import {getTasks} from './taskActions';
import { BACKEND_URL } from './backendUrl';
import fetch from 'cross-fetch';
export const logIn = (username, password) => dispatch => {
    dispatch({
        type:CLEAR_LOGIN_MESSAGE
    })
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
                dispatch({
                    type: WRONG_PASSWORD
                })
            } else if (status == 404) {
                dispatch({
                    type: NO_USER_FOUND
                })
            } else {
                console.log(err)
            }
        })
};


export const logOut = () => dispatch => {
    console.log('action logOut called')
    dispatch({
        type: LOG_OUT
    })
};

