import React, { Component, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Timer from '../Timer';
import TaskForm from '../TaskForm';
import TaskList from '../TaskList'
import BreakButton from '../BreakButton';
import { addTask, getTodaysTasks } from '../../actions/taskActions';
import { getSavedTasks, addSavedTask, deleteSavedTask } from '../../actions/savedTaskActions';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import TaskAdderPrompt from './../TaskAdderPrompt';
import TaskVisualization from '../TaskVisualization';
import './HomePage.css';
function HomePage(props) {
    const history = useHistory();
    const isLogged = useSelector(state => state.authReducer.isLogged);
    if(!isLogged) {
        history.push('/login')
    }
    const credentials = useSelector(state => state.authReducer.credentials);
    const dispatch = useDispatch()
    dispatch(getTodaysTasks(credentials.username));
    dispatch(getSavedTasks(credentials.username));
    const tasksLoaded = useSelector(state => {
        console.log(state.taskReducer.tasksLoaded)
        return state.taskReducer.tasksLoaded;
    })


    const [taskIsActive, setTaskIsActive] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    // TASK DATA
    const [currentTaskName, setCurrentTaskName] = useState(' ');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [duration, setDuration] = useState(0);
    const [promptOpen, setPromptOpen] = useState(false);
    

    //timer state handling
    const taskTimerRef = useRef(null);
    const breakTimerRef = useRef(null)
    // -set start date of task
    // -
    const getDuration = () => {
        return Math.abs(Date.now() - startDate) / 1000
    }
    const startTask = () => {
        setStartDate(Date.now());
        setTaskIsActive(true);
        taskTimerRef.current.startTimer();
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
        
        taskTimerRef.current.resetTimer();
        breakTimerRef.current.resetTimer();
        setTaskIsActive(false);
        setOnBreak(false);
        setCurrentTaskName(' ');
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
        taskTimerRef.current.pauseTimer();
        breakTimerRef.current.startTimer();
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
        taskTimerRef.current.startTimer();
        breakTimerRef.current.resetTimer();
    }

    const getTaskName = (event) => {
        // const taskName = prompt('Please enter the name of your task');
        // setCurrentTaskName(taskName);

        // if (taskName) {
        //     startTask()
        // }
        setPromptOpen(true);

    }

    
    return(
        <div className='page-container'>
            <div className ='home-page-body'>
                <div className = 'timer-section'>
                    <div className = 'current-task-text'><h2>{(onBreak) ? 'Break' : currentTaskName }</h2></div>
                    <div className = 'timers'>
                        <Timer ref = {taskTimerRef} class = {'timer-' + ((onBreak) ? 'inactive' : 'active')}/>
                        <Timer ref = {breakTimerRef} class = {'break-timer-' + ((onBreak) ? 'active' : 'inactive')}/>
                    </div>
                    
                    {!promptOpen && <div className = 'timer-buttons'>
                        <div>
                            <button className='join-button-nf' onClick={taskIsActive ? endTask : getTaskName}>
                                {taskIsActive ? 'End Task' : 'Start New Task'}
                            </button>
                        </div>
                        {taskIsActive && <BreakButton onBreak = {onBreak} continueTask = {continueTask} breakTask = {breakTask}/>}
                    </div>}
                    {promptOpen && <TaskAdderPrompt credentials={credentials} setCurrentTaskName={setCurrentTaskName} setPromptOpen={setPromptOpen} startTask={startTask}/>}
                </div>
                <div className = 'task-section'>
                    <h3>Today's Tasks</h3>
                    <TaskList/>
                </div>
            </div>


            {/* {tasksLoaded && <TaskVisualization/>} */}
            {/* <TaskForm setCurrentTaskName={setCurrentTaskName} startTask={startTask}/> */}
        </div>
    )
}

export default HomePage;