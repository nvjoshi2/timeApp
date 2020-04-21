import React from 'react';
import Logo from '../../Logoclock.png';
import { Link, useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useSelector } from 'react-redux';
import AnimatedClock from '../AnimatedClock';
import TaskListDemo from '../TaskListDemo';
const LandingPage = (props) => {
    const history = useHistory()
    const isLogged = useSelector(state => state.authReducer.isLogged);
    if(isLogged) {
        history.push('/home')
    }
    return(
        <div className = 'page-container'>
            <div className = 'landing-body'>
                {/* <div><img alt='' className = 'big-logo' src = {Logo}></img></div> */}
                <AnimatedClock/>
                <div className = 'right-container landing-page-item'>
                    <div className = 'landing-text'>
                        <h1 className = 'animated-task title'>Own Your Time</h1>
                        <span className = 'animated-task subtitle'>Track and visualize your daily productivity </span>
                        <Link to = '/register' className='animated-task join-button'>Join Now</Link>
                    </div>
                    <TaskListDemo/>
                </div>
                
            </div>
        </div>
        
    )
}

export default LandingPage;