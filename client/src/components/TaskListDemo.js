import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../actions/taskActions';
import convertSecToString from '../functions/convertSecToString';
import './TaskList.css';
import './pages/LandingPage.css';
import {useTrail, animated} from 'react-spring'
const TaskListDemo = (props) => {
    const handleDelete = () => {
    }

    const tasks = [
        {
            taskName: 'answering emails',
            duration: 3600,
            startDate: '12:00 pm',
            endDate: '1:00 pm',
            color: '#e62222',
            key: 1
        },
        {
            taskName: 'working out',
            duration: 3600,
            startDate: '1:00 pm',
            endDate: '2:00 pm',
            color: '#f3ff47',
            key: 2
        },
        {
            taskName: 'website development',
            duration: 3600,
            startDate: '2:00 pm',
            endDate: '3:00 pm',
            color: '#0cf5ca',
            key: 3
        },
        // {
        //     taskName: 'break',
        //     duration: 1500,
        //     startDate: '2:00 pm',
        //     endDate: '2:25 pm',
        //     color: '#a0a199'
        // },
        // {
        //     taskName: 'website development',
        //     duration: 2100,
        //     startDate: '2:25 pm',
        //     endDate: '3:00 pm',
        //     color: '#0cf5ca'
        // },
        {
            taskName: 'doing homework',
            duration: 3600,
            startDate: '3:00 pm',
            endDate: '4:00 pm',
            color: '#fa9bf4',
            key: 4
        },


    ]
    const tasksStyled = tasks.map(({taskName, duration, startDate, endDate, color, key}) => (
            <li style = {{
                padding: '1rem',
                margin: '0.5rem',
                background: '#202027',
                borderRadius: '6px',
                borderLeft: '5px solid ' + color,
                listStyle: 'none'
            }}>
                <div className = {`task-container task${key}`}>
                    <div className ='task-title-timespan-container'>
                        <div className = 'task-title'>{taskName } </div>
                        <div className = 'task-timespan'>{startDate + ' - ' + endDate}</div>
                    </div>
                    <div className = 'task-duration'>{convertSecToString(duration) + ' '}</div>
                    <button
                    className="remove-btn"
                    onClick = {() => {
                        handleDelete()
                        // console.log(tasks)
                        }}
                    >
                        x
                    </button>
                </div>
            </li>
    ));

    // const transitions = useTransition(tasksStyled, item=>item.key, {
    //     from: { transform: 'translate3d(0, 80px,0)' },
    //     enter: { transform: 'translate3d(0,0px,0)' }
    // })

    // return transitions.map(({item, key, props}) => 
    //     <animated.div key= {key} style={props}>{item.content}</animated.div>
    // )
    
    // const transitions = useTransition(tasksStyled, item => item.key, {
    //     from: { transform: 'translate3d(0,-40px,0)' },
    //     enter: { transform: 'translate3d(0,0px,0)' },
    //     leave: { transform: 'translate3d(0,-40px,0)' }
    // })
    // return transitions.map(({ item, props, key }) =>
    //     <animated.div key={key} style={props}>{item.content}</animated.div>
    // )
    return(
        <div className = 'task-list-container'>
            {/* <ol className = 'task-list'> */}
            {tasks.map(({taskName, duration, startDate, endDate, color, key}) => (
                        // <li className = {'task-' + ((taskName === 'break') ? 'break' : 'activity')}>
                        <div className = {`animated-task task${key}`} style = {{
                            padding: '1rem',
                            margin: '0.5rem',
                            background: '#202027',
                            borderRadius: '6px',
                            borderLeft: '5px solid ' + color
                        }}>
                            <div className = 'task-container'>
                                <div className ='task-title-timespan-container'>
                                    <div className = 'task-title'>{taskName } </div>
                                    <div className = 'task-timespan'>{startDate + ' - ' + endDate}</div>
                                </div>
                                <div className = 'task-duration'>{convertSecToString(duration) + ' '}</div>
                                <button
                                className="remove-btn"
                                onClick = {() => {
                                    handleDelete()
                                    // console.log(tasks)
                                    }}
                                >
                                    x
                                </button>
                             </div>
                        </div>
                    ))}
            {/* </ol> */}
        </div>
    )
}

export default TaskListDemo;