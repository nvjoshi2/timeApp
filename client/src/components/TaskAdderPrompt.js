import React, { Component, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import DropdownInput from 'react-dropdown-input';

const TaskAdderPrompt = ({setCurrentTaskName}) => {
    const [childTaskName, setChildTaskName] = useState('');
    const handleTaskNameChange = (event) => {
        setChildTaskName(event.value)
    }

    const savedTasks = useSelector(state => state.savedTaskReducer.savedTasks)
    const handleSubmit = () => {
        //
    }
    return(
        <div>
            {/* <h1>TaskAddingTool</h1>
            <form onSubmit = {handleSubmit}>
                <label>
                    task name: 
                    <input type="text" value={childTaskName} onChange={handleTaskNameChange}/>
                </label>
            </form>
            <input type="button" value="submit" onClick={handleSubmit}/> */}

            {/* <DropdownInput
                options = {savedTasks}
                defaultValue = ''
                menuClassName= 'dropdown-input'
                placeholder= 'Search Saved Tasks...'
                onChange = {handleTaskNameChange}
                onSelect = {handleTaskNameChange}
            /> */}
        </div>
    )
}

export default TaskAdderPrompt;