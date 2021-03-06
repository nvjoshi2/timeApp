import { GET_TASKS, ADD_TASK, DELETE_TASK, TASKS_LOADING, CLEAR_TASKS, GET_COLOR_MAPS, ADD_TO_COLOR_MAPS } from '../actions/types';

const initialState = {
    tasks: [],
    loading: false,
    tasksLoaded:false,
    taskColorMap: {},
    colorMap: {},
    taskSumMap: {},
    loaded: false
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
            const taskColorMapDelete = state.taskColorMap;
            const colorMapDelete = state.colorMap;
            const taskSumMapDelete = state.taskSumMap;
            console.log('reached before if statement')
            if (taskColorMapDelete) {
                console.log('reached after if statement')
                taskSumMapDelete[action.payload.taskName].duration -= action.payload.duration;
                if (taskSumMapDelete[action.payload.taskName].duration <= 0.0001) {
                    delete taskSumMapDelete[action.payload.taskName]
                    delete taskColorMapDelete[action.payload.taskName];
                    delete colorMapDelete[action.payload.color];
                }
            }
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload._id),
                taskColorMap: taskColorMapDelete,
                colorMap: colorMapDelete,
                taskSumMap: taskSumMapDelete


            }
        
        case TASKS_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_TASKS:
            return initialState;

        case GET_COLOR_MAPS:
            if (state.loaded) {
                return {...state}
            }

            const tasksToCheck = state.tasks;


            var taskColorMap = {};
            var colorMap = {};
            var taskSumMap = {}
            console.log(tasksToCheck)
            for (var i = 0; i < tasksToCheck.length; i++) {
                const task = tasksToCheck[i]
                if (!(task in taskColorMap)) {
                    taskColorMap[task.taskName] = task.color;
                    colorMap[task.color] = null;
                    taskSumMap[task.taskName] = {duration: task.duration, color: task.color}
                } else {
                    taskSumMap[task.taskName].duration += task.duration
                }
            }

            return {
                ...state,
                taskColorMap: taskColorMap,
                colorMap: colorMap,
                taskSumMap: taskSumMap,
                loaded: true

            }

        case ADD_TO_COLOR_MAPS:
            const taskName = action.payload.taskName;
            const color = action.payload.color;
            const duration = action.payload.duration;

            if (!(taskName in state.taskSumMap)) {
                return {
                    ...state,
                    taskColorMap: {
                        ...state.taskColorMap,
                        [taskName]: color,
    
                    },
                    colorMap: {
                        ...state.colorMap,
                        [color]: null
                    },
                    taskSumMap: {
                        ...state.taskSumMap,
                        [taskName]: {duration: duration, color: color}
                    }
                }
            } else {
                const taskSumMap = state.taskSumMap;
                taskSumMap[taskName].duration += duration;

                return {
                    ...state,
                    taskSumMap: taskSumMap
                }

            }


        default:
            return {...state}
    }   
};