import axios from 'axios';
import { GET_SAVED_TASKS, ADD_SAVED_TASK, DELETE_SAVED_TASK, CLEAR_SAVED_TASKS } from './types';

export const getSavedTasks = (username) => dispatch => {
    // dispatch(setTasksLoading());
    axios
        .get(`api/tasks/${username}`) //gives response
        .then(res => 
            dispatch({
                type: GET_SAVED_TASKS,
                payload: res.data
            })
        )
};


export const addSavedTask = (taskData) => dispatch => { //CHANGE: check that res is good before adding to state with dispatch
    axios
        .post('/api/tasks', taskData)
        .then(res => 
            dispatch({
                type: ADD_SAVED_TASK,
                payload: res.data
            })
        )
};

export const deleteSavedTask = (id) => dispatch => {
    axios
        .delete(`/api/tasks/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_SAVED_TASK,
                payload: id
            })
        )
};

export const clearSavedTasks = () => dispatch => {
    dispatch({
        type: CLEAR_SAVED_TASKS
    })
};