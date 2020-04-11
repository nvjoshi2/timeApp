//combining islogged reducer and load credentials reducer
import { LOG_IN, LOG_OUT } from '../actions/types';
const initialState = {
    isLogged: false,
    credentials: {
        username: '',
        password: '',
        email: '',
        id: ''
    }
};


//what do i want this to do?
// 1) check if username and password are in the database and:
// if not, give an indication of which was wrong
// if so, load username and password into the state and set is logged to true. also call task reducer to load tasks from database


export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN:
            return {
                ...state,
                isLogged: true,
                credentials: {
                    username: action.payload.username,
                    password: action.payload.password,
                    email: action.payload.email,
                    id: action.payload._id
                }
            }
        case LOG_OUT:
            return initialState;

        default:
            return {...state}
    }
}
