import { GET_COLOR_MAPS, ADD_TO_COLOR_MAPS, CLEAR_COLOR_MAPS } from './types';

export const getColorMaps = () => {
    return {
        type: GET_COLOR_MAPS
    }
}

export const clearColorMaps = () => {
    return {
        type: CLEAR_COLOR_MAPS
    }
}

export const addToColorMaps = (taskName, color, duration) => {
    return {
        type: ADD_TO_COLOR_MAPS,
        payload: {
            taskName,
            color,
            duration
        }
    }
}