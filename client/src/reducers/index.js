import {authReducer} from './authReducer';
import {taskReducer} from './taskReducer';
import {savedTaskReducer} from'./savedTaskReducer';
import { combineReducers } from 'redux';
import { colorReducer } from './colorReducer';


const allReducers = combineReducers({
    authReducer,
    taskReducer,
    savedTaskReducer
});

// const allReducers = (state={}, action) => {
//     // const savedTasks = state.savedTaskReducer.savedTasks;
//     // const todaysTasks = state.taskReducer.tasks;
//     // const tasksToCheck = savedTasks.concat(todaysTasks);

//     return {
//         authReducer: authReducer(state.authReducer, action),
//         taskReducer: taskReducer(state.taskReducer, action),
//         savedTaskReducer: savedTaskReducer(state.savedTaskReducer, action),
//         colorReducer: colorReducer(state.colorReducer, {...action, state})
//     }
// }
export default allReducers;
