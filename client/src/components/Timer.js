import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import convertMsToString from '../functions/convertMsToString';
const Timer = forwardRef((props, ref) => {
    const [milis, setmilis] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const initialTime = useRef();

    const startTimer = () => {
        setIsActive(true);
    }
    const pauseTimer = () => {
        // props.setDuration(milis)
        setIsActive(false);
    }

    const resetTimer = () => {
        // props.setDuration(milis)
        // console.log(milis)
        setmilis(0);
        setIsActive(false);
    }

    useEffect(() => {
        var interval = null;
        const preBreakDT = milis;
        if (isActive) {
            var initialDT = new Date().getTime();
            // console.log(initialDT)
            interval = setInterval(() => {
                const currentDT = new Date().getTime();
                const elapsedTime = currentDT - initialDT + preBreakDT;
                setmilis(elapsedTime)
                
            }, 1)
        } else if (!isActive && milis != 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive])

    useImperativeHandle(ref, () => {
        return {
            startTimer : startTimer,
            pauseTimer : pauseTimer,
            resetTimer : resetTimer
        }
    })


    // console.log(props.class)
    return(
        <div className = {props.class}>
            {convertMsToString(milis)}
        </div>
        )
});


export default Timer;