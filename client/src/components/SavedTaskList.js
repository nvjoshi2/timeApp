import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../actions/taskActions';
import { deleteSavedTask } from '../actions/savedTaskActions';
import convertSecToString from '../functions/convertSecToString';
import './TaskList.css'
const TaskList = (props) => {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(deleteSavedTask(id));
    }
    const tasks = useSelector(state => state.savedTaskReducer.savedTasks);

    const toTime = (dtString) => {
        var time = (new Date(dtString)).toTimeString().split(' ')[0].substring(0,5)
        //HH:MM
        if (time.charAt(0) === '0') {
            time = time.substring(1);
            time += ' am';
        } else if (time.substring(0,2) ==='12') {
            time += ' pm';
        } else {
            const hourInt = parseInt(time.substring(0,2));
            const convertedInt = hourInt - 12;
            time = String(convertedInt) + time.substring(2) + ' pm'

        }
        return time;
    }
    return(
        // <Container>
        //     <ListGroup>
        //             {tasks.map(({_id, taskName, duration, startDate, endDate}) => (
        //                 <ListGroupItem>
        //                     <Button
        //                      className="remove-btn"
        //                      color="danger"
        //                      size="sm"
        //                      onClick = {() => {
        //                          handleDelete(_id)
        //                          console.log(tasks)
        //                         }}
        //                      >
        //                          x
        //                      </Button>
        //                     {taskName + ' '} 
        //                     {convertSecToString(duration) + ' '}
        //                     {toTime(startDate) + ' - ' + toTime(endDate)}
        //                 </ListGroupItem>
        //             ))}
        //     </ListGroup>
        // </Container>

        <div className = 'saved-task-list-container'>
            <ol className = 'task-list-saved'>
            {tasks.map(({_id, taskName}) => (
                        // <li className = {'task-' + ((taskName === 'break') ? 'break' : 'activity')}>
                        <li style = {{
                            padding: '1rem',
                            margin: '0.5rem',
                            background: '#202027',
                            borderRadius: '6px',
                            // borderLeft: '5px solid ' + color
                        }}>
                            <div className = 'task-container'>
                                <div className ='task-title-timespan-container'>
                                    <div className = 'task-title'>{taskName } </div>
                                    {/* <div className = 'task-timespan'>{toTime(startDate) + ' - ' + toTime(endDate)}</div> */}
                                </div>
                                {/* <div className = 'task-duration'>{convertSecToString(duration) + ' '}</div> */}
                                <button
                                className="remove-btn"
                                onClick = {() => {
                                    handleDelete(_id)
                                    // console.log(tasks)
                                    }}
                                >
                                    x
                                </button>
                             </div>
                        </li>
                    ))}
            </ol>
        </div>
    )
}

export default TaskList