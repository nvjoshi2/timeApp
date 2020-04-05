import { GET_TASKS, ADD_TASK, DELETE_TASK, TASKS_LOADING, CLEAR_TASKS } from '../actions/types';

const initialState = {
    tasks: [],
    loading: false,
    tasksLoaded:false
};

export const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
                tasksLoaded: true
            }

        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        
        case TASKS_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_TASKS:
            return {
                tasks: [],
                tasksLoaded:false
            }
        default:
            return {...state}
    }   
};