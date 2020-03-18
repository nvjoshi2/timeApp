import {authReducer} from './authReducer';
import {taskReducer} from './taskReducer';
import {savedTaskReducer} from'./savedTaskReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    authReducer,
    taskReducer,
    savedTaskReducer
});

export default allReducers;
