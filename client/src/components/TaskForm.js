import React, { Component, useState, useRef } from 'react';

const TaskForm = ({setCurrentTaskName}) => {
    const [taskName, setTaskName] = useState('')
    const handleChange = (event) => {
        setTaskName(event.target.value)
    }

    // const handleSubmit = (event) => {
    //     setCurrentTaskName(taskName)
    // }

    return(
        <h1>
            <form >
                <lable>
                    <input type="text" value={taskName} onChange={handleChange}/>
                </lable>
            </form>
            <input type="button" value="submit" onClick={(event) => {setCurrentTaskName(taskName)}}/>
        </h1>
    )
}

export default TaskForm;