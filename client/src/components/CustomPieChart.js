import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PieChart from 'react-minimal-pie-chart';
const CustomPieChart = (props) => {
    // const dispatch = useDispatch();
    const taskSums = useSelector(state => {
        const taskSumMap = state.taskReducer.taskSumMap;
        return Object.keys(taskSumMap).map(taskName => ({title: taskName, value: taskSumMap[taskName].duration, color: taskSumMap[taskName].color}))
    })
    // const tasks = useSelector(state => state.taskReducer.tasks)
    // if (tasks.length == 0 && taskSums != {}) {
    //     dispa
    // }
    return (
        <PieChart
        data = {taskSums}
        />
    )
}

export default CustomPieChart;