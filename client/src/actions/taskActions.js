import axios from 'axios';
import { GET_TASKS, ADD_TASK, DELETE_TASK, CLEAR_TASKS, GET_COLOR_MAPS } from './types';
import { BACKEND_URL } from './backendUrl';
export const setTasksLoading = () => {
    return {
        type: 'TASKS_LOADING'
    }
}

export const getTasks = (username) => dispatch => {
    // dispatch(setTasksLoading());
    axios
        .get(`${BACKEND_URL}/api/taskInstances/${username}`) //gives response
        .then(res => 
            dispatch({
                type: GET_TASKS,
                payload: res.data
            })
        )
};

export const getTodaysTasks = (username) => dispatch => {
    console.log('getTodaysTasksCalled')
    axios
        .get(`${BACKEND_URL}/api/taskInstances/today/${username}`)
        .then(res =>
            dispatch({
                type: GET_TASKS,
                payload: res.data
            })
        )
        .then(() =>{
            dispatch({
                type: GET_COLOR_MAPS
            })
        })
}


export const getDateTasks = (username, date) => dispatch => {
    console.log('reached getDateTasks action')
    axios
        .get(`${BACKEND_URL}/api/taskInstances/date/${username}/${date}`)
        .then(res => dispatch({
            type: GET_TASKS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const addTask = (taskData) => dispatch => { //CHANGE: check that res is good before adding to state with dispatch
    axios
        .post(`${BACKEND_URL}/api/taskInstances`, taskData)
        .then(res => 
            dispatch({
                type: ADD_TASK,
                payload: res.data
            })
        )
};

export const deleteTask = (id) => dispatch => {
    axios
        .delete(`${BACKEND_URL}/api/taskInstances/${id}`)
        .then(res => {
            console.log(id)
            console.log(res)
            dispatch({
                type: DELETE_TASK,
                payload: res.data.taskInstance
            })
        })
};

export const clearTasks = () => dispatch => {
    dispatch({
        type: CLEAR_TASKS
    })
}



