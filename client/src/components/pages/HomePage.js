import React, { Component, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Timer from '../Timer';
import TaskForm from '../TaskForm';
import TaskList from '../TaskList'
import BreakButton from '../BreakButton';
import { addTask, getTodaysTasks } from '../../actions/taskActions';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import TaskAdderPrompt from './../TaskAdderPrompt';


function HomePage(props) {
    const history = useHistory();
    const isLogged = useSelector(state => state.authReducer.isLogged);
    if(!isLogged) {
        history.push('/')
    }
    const credentials = useSelector(state => state.authReducer.credentials);
    const dispatch = useDispatch()
    dispatch(getTodaysTasks(credentials.username))


    const [taskIsActive, setTaskIsActive] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    // TASK DATA
    const [currentTaskName, setCurrentTaskName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [duration, setDuration] = useState(0);
    
    

    //timer state handling
    const ref = useRef(null);

    // -set start date of task
    // -
    const getDuration = () => {
        return Math.abs(Date.now() - startDate) / 1000
    }
    const startTask = () => {
        setStartDate(Date.now());
        setTaskIsActive(true);
        ref.current.startTimer();
    }
    
    const endTask = () => {
        setEndDate(Date.now());
        if (onBreak) {
            dispatch(addTask({
                username: credentials.username,
                taskName: 'break',
                startDate: startDate,
                endDate: Date.now(),
                duration: getDuration()
            }))
        } else {
            dispatch(addTask({
                username: credentials.username,
                taskName: currentTaskName,
                startDate: startDate,
                endDate: Date.now(),
                duration: getDuration()
            }))
        }
        
        ref.current.resetTimer();
        setTaskIsActive(false);
        setOnBreak(false);
        setCurrentTaskName('');
        setStartDate(null);
        setEndDate(null);

    }
    // -set end date to current, push task to 
    const breakTask = () => {
        //add task that was being worked on before break
        dispatch(addTask({
            username: credentials.username,
            taskName: currentTaskName,
            startDate: startDate,
            endDate: Date.now(),
            duration: getDuration()
        }));
        //change state values for adding break task
        setStartDate(Date.now());
        setOnBreak(true);
        ref.current.pauseTimer();
    }
    const continueTask = () => {
        dispatch(addTask({
            username: credentials.username,
            taskName: 'Break',
            startDate: startDate,
            endDate: Date.now(),
            duration: getDuration()
        }))
        setStartDate(Date.now());

        setOnBreak(false);
        ref.current.startTimer();
    }

    const getTaskName = (event) => {
        const taskName = prompt('Please enter the name of your task');
        setCurrentTaskName(taskName);
        if (taskName) {
            startTask()
        }

    }
    
    return(
        <div>
            <div><h2>{currentTaskName}</h2></div>
            <Timer ref = {ref} setDuration={setDuration}/>
            {/* <TaskAdderPrompt setCurrentTaskName = {setCurrentTaskName}/> */}
            <button className='button button-start-task' onClick={taskIsActive ? endTask : getTaskName}>
                {taskIsActive ? 'End Task' : 'Start New Task'}
            </button>
            {/* <button className='button button-end-task' onClick={endTask}>
                End Task
            </button> */}
            
            {taskIsActive && <BreakButton onBreak = {onBreak} continueTask = {continueTask} breakTask = {breakTask}/>}
            <h3>Today's Tasks</h3>
            <TaskList/>
            {/* <TaskForm setCurrentTaskName={setCurrentTaskName} startTask={startTask}/> */}
        </div>
    )
}

export default HomePage;