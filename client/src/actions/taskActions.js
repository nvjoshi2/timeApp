import axios from 'axios';
import { GET_TASKS, ADD_TASK, DELETE_TASK, CLEAR_TASKS } from './types';
export const setTasksLoading = () => {
    return {
        type: 'TASKS_LOADING'
    }
}

export const getTasks = (username) => dispatch => {
    // dispatch(setTasksLoading());
    axios
        .get(`api/taskInstances/${username}`) //gives response
        .then(res => 
            dispatch({
                type: GET_TASKS,
                payload: res.data
            })
        )
};

export const getTodaysTasks = (username) => dispatch => {
    axios
        .get(`api/taskInstances/today/${username}`)
        .then(res =>
            dispatch({
                type: GET_TASKS,
                payload: res.data
            })
        )
}


export const getDateTasks = (username, date) => dispatch => {
    console.log('reached getDateTasks action')
    axios
        .get(`/api/taskInstances/date/${username}/${date}`)
        .then(res => dispatch({
            type: GET_TASKS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const addTask = (taskData) => dispatch => { //CHANGE: check that res is good before adding to state with dispatch
    axios
        .post('/api/taskInstances', taskData)
        .then(res => 
            dispatch({
                type: ADD_TASK,
                payload: res.data
            })
        )
};

export const deleteTask = (id) => dispatch => {
    axios
        .delete(`/api/taskInstances/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        )
};

export const clearTasks = () => dispatch => {
    dispatch({
        type: CLEAR_TASKS
    })
}



