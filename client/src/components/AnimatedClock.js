import React from 'react';
import './AnimatedClock.css'
import clock from '../clock.png';
import minuteHand from '../minute-hand.png';
import hourHand from '../hour-hand.png';
import outerClock from '../outer-clock.png';
import innerCircle from '../inner-circle.png';
import pulseCircle from '../pulse-circle.png';
const AnimatedClock = () => (
    // <div className = 'clock-section'>
        <div className = 'clock-wrapper landing-page-item'>
            <img className = 'clock-img pulse-circle' src={pulseCircle}/>
            <img className = 'clock-img outer-clock' src={outerClock}/>
            <img className = 'clock-img inner-circle' src={innerCircle}/>
            <img className = 'clock-img hours' src={hourHand}/>
            <img className = 'clock-img minutes' src={minuteHand}/>
        </div>
    // </div>
)

export default AnimatedClock;