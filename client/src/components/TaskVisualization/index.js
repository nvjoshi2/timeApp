import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import useDimensions from "react-use-dimensions";
import useComponentSize from '@rehooks/component-size'
const TaskVisualization = (props) => {
    const ref = useRef(null)
    const size = useComponentSize(ref)



    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    // get tasks, hours, and earliest date from state
    const [tasks, hours, earliestDate, nHours] = useSelector(state => {
        console.log('useSelector called')
        const tasksUnsorted = state.taskReducer.tasks
        if (tasksUnsorted.length < 1) {
            return [[], []]
        }
        const tasksSorted = tasksUnsorted.sort((a,b) => {
            const aDate = new Date(a.startDate)
            const bDate = new Date(b.startDate)
            return bDate.getTime() - aDate.getTime()
        })

        const earliestDate = new Date(tasksSorted[tasksSorted.length - 1].startDate)
        earliestDate.setMinutes(0)
        earliestDate.setMilliseconds(0)

        const nHours = new Date().getHours() - new Date(tasksSorted[tasksSorted.length - 1].startDate).getHours() + 2;
        console.log(nHours)
        Date.prototype.addHours = function(h) {
            const date = new Date(this.getTime() + (h*60*60*1000));
            return date;
          }
        const hours = []
        for (let i = 0; i < nHours; i++) {
            hours.push(<div className='hour'>{formatAMPM(earliestDate.addHours(i))}</div>)
        }
        return [tasksSorted, hours, earliestDate, nHours]
    })
    // console.log('0th index' + String(tasks[0].startDate))
    // console.log('-1th index' + String(tasks[-1].startDate))
    const calcPosition = (taskDate) => {
        const taskDateObject = new Date(taskDate);
        const hrsBetween = (taskDateObject.getTime() - earliestDate.getTime()) / 3600000;
        return hrsBetween * (size.height / nHours);
    }
    return (
        <div ref = {ref} className= 'box-outer'>
            <div className ='box-time'>
                {hours}
            </div>
            <div className='container-tasks'>
                
                {tasks.map(({_id, taskName, startDate, duration}) => (
                   <div style = {{
                       position: 'absolute',
                       background: 'orange',
                       height: Math.max((duration / 3600) * (size.height / nHours), 18),
                       top: calcPosition(startDate),
                       width: '200px',
                       textAlign:'center',
                       zIndex: (new Date(startDate)).getTime(),
                       borderRadius: '0.25rem'
                   }}>{taskName}</div>
                ))}

            </div>

        </div>
    )
}

export default TaskVisualization;