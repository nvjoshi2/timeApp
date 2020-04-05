import React, { Component, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';
import { getDateTasks, getTestTasks } from '../../actions/taskActions';
import axios from 'axios';
import TaskList from '../TaskList';
import './HistoryPage.css'
function HistoryPage(props) {

    // IMPROVEMENTS:
    // -GOALS to compare to actual on daily basis, can see in history
    //     +weekly summary / score

    const isLogged = useSelector(state => state.authReducer.isLogged)

    const history = useHistory()
    if (!isLogged) {
        history.push('/login')
    }
    const dispatch = useDispatch()
    const credentials = useSelector(state => state.authReducer.credentials);


    const [currentDate, setCurrentDate] = useState(null);

    const onChange = (date) => {
        // console.log('date sent to server: ' + date)
        dispatch(getDateTasks(credentials.username, date))
    }


    //need to
    return(
        <div className='page-container'>
            <div className="spacer"></div><h1>History</h1><div className = "spacer"></div>
            <Calendar onChange = {onChange}/>
            <TaskList/>
        </div>
    )
}

export default HistoryPage;