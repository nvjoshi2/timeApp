import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Timer from '../Timer';
import TaskList from '../TaskList'
import BreakButton from '../BreakButton';
import { addTask, getTodaysTasks, clearTasks } from '../../actions/taskActions';
import { getSavedTasks } from '../../actions/savedTaskActions';
import { useHistory } from 'react-router-dom';
import TaskAdderPrompt from './../TaskAdderPrompt';
import randomColor from 'randomcolor';
import { addToColorMaps } from '../../actions/colorActions';
import CustomPieChart from '../CustomPieChart';
import './HomePage.css';
function HomePage(props) {
    const tasksLoaded = useSelector(state => {
        console.log(state.taskReducer.tasksLoaded)
        return state.taskReducer.tasksLoaded;
    });
    const history = useHistory();
    const isLogged = useSelector(state => state.authReducer.isLogged);
    if(!isLogged) {
        history.push('/login')
    }
    const credentials = useSelector(state => state.authReducer.credentials);
    const dispatch = useDispatch()
    dispatch(getSavedTasks(credentials.username));
    dispatch(getTodaysTasks(credentials.username));
    const taskColorMap = useSelector(state => state.taskReducer.taskColorMap)
    const colorMap = useSelector(state => state.taskReducer.colorMap)
    // if (tasks.length == 0 && taskColorMap != {}) {
    //     console.log('cleared tasks')
    //     dispatch(clearTasks())
    // }

    // const taskSumMap = useSelector(state => state.taskReducer.taskSumMap)
    const breakColor = '#8f2626';
    // var taskColorMap = {
    //     'x' : 'red',
    //     'y' : 'blue',
    //     'z' : 'green',
    //     'h' : 'yellow'
    // };
    // var colorMap = {
    //     'red' : null,
    //     'blue' : null,
    //     'green' : null,
    //     'yellow' : null
    // };
    // const [taskColorMap, colorMap] = useSelector(state => {
    //     const savedTasks = state.savedTaskReducer.savedTasks;
    //     const todaysTasks = state.taskReducer.tasks;
    //     const tasksToCheck = savedTasks.concat(todaysTasks);

    //     var taskColorMap= {}
    //     var colorMap = {}
    //     taskColorMap['break'] = breakColor;
    //     colorMap[breakColor] = null;
    //     for (var i = 0; i < tasksToCheck.length; i++) {
    //         const task = tasksToCheck[i]
    //         if (task.color) {
    //             taskColorMap[task.taskName] = task.color;
    //             colorMap[task.color] = null;
    //         }
    //     }
    //     return [taskColorMap, colorMap];

        

    // }, )


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

    const colorSetter = (taskName) => {
        var color;
        if (taskName in taskColorMap) {
            color = taskColorMap[taskName];
        } else {
            color = randomColor();
            while (color in colorMap) {
                color = randomColor();
            }
        }
        return color;
    }
    
    const endTask = () => {
        setEndDate(Date.now());
        if (onBreak) {
            dispatch(addTask({
                username: credentials.username,
                taskName: 'break',
                startDate: startDate,
                endDate: Date.now(),
                duration: getDuration(),
                color: breakColor
            }))
        } else {
            const color = colorSetter(currentTaskName);
            const duration = getDuration()
            dispatch(addTask({
                username: credentials.username,
                taskName: currentTaskName,
                startDate: startDate,
                endDate: Date.now(),
                duration: duration,
                color: color
            }))
            dispatch(addToColorMaps(currentTaskName, color, duration))
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
        const color = colorSetter(currentTaskName);
        const duration = getDuration();
        dispatch(addTask({
            username: credentials.username,
            taskName: currentTaskName,
            startDate: startDate,
            endDate: Date.now(),
            duration: duration,
            color: color
        }));
        dispatch(addToColorMaps(currentTaskName, color, duration))
        
        //change state values for adding break task
        setStartDate(Date.now());
        setOnBreak(true);
        taskTimerRef.current.pauseTimer();
        breakTimerRef.current.startTimer();
    }
    const continueTask = () => {
        dispatch(addTask({
            username: credentials.username,
            taskName: 'break',
            startDate: startDate,
            endDate: Date.now(),
            duration: getDuration(),
            color: breakColor
        }))
        setStartDate(Date.now());

        setOnBreak(false);
        taskTimerRef.current.startTimer();
        breakTimerRef.current.resetTimer();
    }

    const getTaskName = (event) => {
        setPromptOpen(true);

    }

    
    return(
        <div className='page-container'>
            {promptOpen && <TaskAdderPrompt
                             credentials={credentials}
                             setCurrentTaskName={setCurrentTaskName} 
                             setPromptOpen={setPromptOpen} 
                             startTask={startTask}
                             taskColorMap = {taskColorMap}
                             colorMap = {colorMap}
                             colorSetter = {colorSetter}
                             />}
            <div className = {'home-page-body' + ((promptOpen) ? ' faded' : '')}>
                <div className = 'home-body-top'>
                    <div className = 'timer-section'>
                        <div className = 'current-task-text'><h2>{(onBreak) ? 'break' : currentTaskName }</h2></div>
                        <div className = 'timers'>
                            <Timer ref = {taskTimerRef} class = {'timer-' + ((onBreak) ? 'inactive' : 'active')}/>
                            <Timer ref = {breakTimerRef} class = {'break-timer-' + ((onBreak) ? 'active' : 'inactive')}/>
                        </div>
                        
                        <div className = 'timer-buttons'>
                            <div>
                                <button className='join-button-nf' onClick={taskIsActive ? endTask : getTaskName}>
                                    {taskIsActive ? 'End Task' : 'Start New Task'}
                                </button>
                            </div>
                            {taskIsActive && <BreakButton onBreak = {onBreak} continueTask = {continueTask} breakTask = {breakTask}/>}
                        </div>
                        
                    </div>
                    <div className = 'task-section'>
                        <TaskList/>
                    </div>
                    {/* <div className = 'pie-chart'>
                        <CustomPieChart/>
                    </div> */}
                </div>
                <div className = 'home-body-bottom'>
                    <CustomPieChart/>
                </div>
            </div>


            {/* {tasksLoaded && <TaskVisualization/>} */}
            {/* <TaskForm setCurrentTaskName={setCurrentTaskName} startTask={startTask}/> */}
        </div>
    )
}

export default HomePage;