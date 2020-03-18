import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const Timer = forwardRef((props, ref) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);


    const startTimer = () => {
        setIsActive(true);
    }
    const pauseTimer = () => {
        // props.setDuration(seconds)
        setIsActive(false);
    }

    const resetTimer = () => {
        // props.setDuration(seconds)
        setSeconds(0);
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds + 1)
            }, 1000)
        } else if (!isActive && seconds != 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive, seconds])

    useImperativeHandle(ref, () => {
        return {
            startTimer : startTimer,
            pauseTimer : pauseTimer,
            resetTimer : resetTimer
        }
    })



    return(
        <div className="app">
            <div className="time">
                {seconds}s
            </div>
            {/* <div className="row">
                <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick = {toggle}>
                {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="button" onClick={reset}>
                Reset
                </button>
            </div> */}
        </div>
    )
});


export default Timer;