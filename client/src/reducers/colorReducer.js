import {GET_COLOR_MAPS, ADD_TO_COLOR_MAPS, CLEAR_COLOR_MAPS} from '../actions/types';

const initialState = {
    taskColorMap: {},
    colorMap: {},
    taskSumMap: {},
    loaded: false
}

export const colorReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_COLOR_MAPS:
            if (state.loaded) {
                return {...state}
            }

            const tasksToCheck = action.state.taskReducer.tasks;


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
            



        case CLEAR_COLOR_MAPS:
            return initialState
        default:
            return {...state}
    }

    
}
