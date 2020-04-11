import React from 'react';
import Logo from '../../Logoclock.png';
import { Link } from 'react-router-dom';
import './LandingPage.css';
const LandingPage = (props) => {

    return(
        <div className = 'page-container'>
            <div className = 'landing-body'>
                <div><img alt='' className = 'big-logo' src = {Logo}></img></div>
                <div className = 'landing-text'>
                    <h1 className = 'title'>Own Your Time</h1>
                    <span className = 'subtitle'>Track and visualize your daily productivity </span>
                    <Link to = '/register' className='join-button'>Join Now</Link>
                </div>
            </div>
        </div>
        
    )
}

export default LandingPage;