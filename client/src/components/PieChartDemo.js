import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PieChart from 'react-minimal-pie-chart';
const PieChartDemo = (props) => {
    // const dispatch = useDispatch();
    const tasks = [
        {
            taskName: 'answering email',
            duration: 1800,
            startDate: '9:15 am',
            endDate: '9:45 am',
            color: '#e62222'
        },
        {
            taskName: 'working out',
            duration: 3600,
            startDate: '10:00 am',
            endDate: '11:00 am',
            color: '#f3ff47'
        },
        {
            taskName: 'website development',
            duration: 9300,
            startDate: '12:00 pm',
            endDate: '2:00 pm',
            color: '#0cf5ca'
        },
        // {
        //     taskName: 'break',
        //     duration: 1500,
        //     startDate: '2:00 pm',
        //     endDate: '2:25 pm',
        //     color: '#a0a199'
        // },
        {
            taskName: 'doing homework',
            duration: 3600,
            startDate: '3:00 pm',
            endDate: '4:00 pm',
            color: '#fa9bf4'
        },


    ]

    const taskSums = tasks.map(({taskName, duration, color}) => ({title: taskName, value: duration, color: color}))

    return (
        <PieChart
        data = {taskSums}

        labelPosition={115}
        startAngle = {0}
        />
    )
}

export default PieChartDemo;