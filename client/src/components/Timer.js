import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePerciseTimer from '../hooks/usePerciseTimer';
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
        console.log(milis)
        setmilis(0);
        setIsActive(false);
    }

    useEffect(() => {
        var interval = null;
        const preBreakDT = milis;
        if (isActive) {
            var initialDT = new Date().getTime();
            console.log(initialDT)
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

    const convertMsToString = (ms) => {
        // 1- Convert to s:
        var s = ms / 1000;
        // 2- Extract h:
        var h = parseInt( s / 3600 ); // 3,600 s in 1 hour
        s = s % 3600; // s remaining after extracting h
        // 3- Extract m:
        var m = parseInt( s / 60 ); // 60 s in 1 minute
        // 4- Keep only s not extracted to m:
        s = parseInt(s % 60);
        // const h = String(parseInt( ms / (3600 * 1000) ))

        // ms = ms % (3600 * 1000)

        // const m = String(parseInt( ms / (60 * 1000) ))

        // ms = ms % (60 * 1000);
        if (h == 0) {
            h = ''
        } else if (h < 10) {
            h = `0${h}:`;
        }
        if (m < 10) {
            m = `0${m}`;
        }
        if (s < 10) {
            s = `0${s}`;
        }
 
        return `${h}${m}:${s}`;
    }

    console.log(props.class)
    return(
        <div className = {props.class}>
            {convertMsToString(milis)}
        </div>
        )
});


export default Timer;