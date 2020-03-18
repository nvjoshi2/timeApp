import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../actions/taskActions';

const TaskList = (props) => {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    }
    const tasks = useSelector(state => {
        
        const tasksUnsorted = state.taskReducer.tasks
        const tasksSorted = tasksUnsorted.sort((a,b) => {
            console.log(typeof(a.startDate))
            const aDate = new Date(a.startDate)
            const bDate = new Date(b.startDate)
            return bDate.getTime() - aDate.getTime()
        })
        return tasksSorted
    })
    return(
        <Container>
            <ListGroup>
                    {tasks.map(({_id, taskName, duration}) => (
                        <ListGroupItem>
                            <Button
                             className="remove-btn"
                             color="danger"
                             size="sm"
                             onClick = {() => {
                                 handleDelete(_id)
                                 console.log(tasks)
                                }}
                             >
                                 x
                             </Button>
                            {taskName + ' '} 
                            {duration}
                        </ListGroupItem>
                    ))}
            </ListGroup>
        </Container>
    )
}

export default TaskList