 import {  GET_SAVED_TASKS, ADD_SAVED_TASK, DELETE_SAVED_TASK, CLEAR_SAVED_TASKS} from '../actions/types'
const initialState = {
    savedTasks: [],
};

export const savedTaskReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SAVED_TASKS:
            return {
                ...state,
                savedTasks: action.payload
            }

        case ADD_SAVED_TASK:
            return {
                ...state,
                savedTasks: [action.payload, ...state.savedTasks]
            }
        
        case DELETE_SAVED_TASK:
            return {
                ...state,
                savedTasks: state.savedTasks.filter(task => task._id !== action.payload)
            }
        
        case CLEAR_SAVED_TASKS:
            return initialState;
        default:
            return {...state}
    }   
}