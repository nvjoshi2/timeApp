import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSavedTask } from '../actions/savedTaskActions';
import { addToColorMaps } from '../actions/colorActions';
import Select from 'react-select';
import './TaskAdderPrompt.css';
// import DropdownInput from 'react-dropdown-input';

const TaskAdderPrompt = ({credentials, setCurrentTaskName, setPromptOpen, startTask, taskColorMap, colorMap, colorSetter}) => {
    const colourStyles = {
        // input: (base, state) => ({
        //     ...base,
        //     '[type="text"]': {
        //       color: 'white',
        //       fontFamily: 'Helvetica, sans-serif !important',
        //       fontSize: 13,
        //       fontWeight: 100,
        //       color: 'red'
        //     }
        //   }),
        input: base => ({
            ...base,
            color: "white"
          }),
        singleValue: base => ({
            ...base,
            color: "white"
          }),
        control: (base, state) => ({
            ...base,
            backgroundColor: '#202027',
            borderColor: '#202027',
//    // This line disable the blue border
            boxShadow: '1px #202027',
            '&:hover': {
                borderColor: '#202027'
            },
            width: '18rem'
        }),

        menu: (base) => ({
            ...base,
            backgroundColor: '#202027'
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          const selectColor = '#368d8f';
          const hoverColor = '#32323b';

          var color = '#202027';

          if (isSelected) {
            color = selectColor;
          } else if (isFocused) {
            color = hoverColor;
          } 

          return {
            // ...styles,
            backgroundColor: color,
            color: 'white',
            cursor: isDisabled ? 'not-allowed' : 'default',
            padding: '0.5rem'
          }
        }

      };

    // const onInputChange = (value, { action }) => {
    //     console.log('input-change action: ' + action)
    //     const previousVal = childTaskName;
    //     if (action == 'input-change' || action == 'set-value') {

    //         setChildTaskName(value)
    //     }
    //     // }  else if (action == 'set-value') {
    //     //     setChildTaskName(value)
    //     //     setChildTaskName(previousVal)
    //     // }
    //     // if (action !== 'menu-close' && action !== 'input-blur') {
    //     //     setChildTaskName(value)
    //     // }
    // }
    const [childTaskName, setChildTaskName] = useState('');
    const [willSaveTask, setWillSaveTask] = useState(false);

    const dispatch = useDispatch();
    const onChange = (value, {action}) => {
        console.log(action)
        console.log(value)
        setChildTaskName(value)
        
    }

    const onInputChange = (valueLabel, {action}) => {

        if (action === 'input-change') {
            const value = {label: valueLabel, value: valueLabel}
            onChange(value, {action})
        }
    }

    const savedTasks = useSelector(state => state.savedTaskReducer.savedTasks);
    const options = savedTasks.map(task => ({label: task.taskName, value: task._id}));

    const handleSubmit = () => {
        if (!childTaskName) {
            return;
        }
        if (willSaveTask) {
            dispatch(addSavedTask({
                username: credentials.username,
                taskName: childTaskName.label
            }))
        }
        setCurrentTaskName(childTaskName.label);
        setPromptOpen(false);
        startTask();
    }
    

    console.log('task name:' + childTaskName)
    return(
        <div className = 'task-prompt-container'>
            <button className='close-prompt-button' onClick = {() => setPromptOpen(false)}>x</button>
            <div className = 'task-adder'>
                
                <Select 
                className = 'prompt-item'
                blurInputOnSelect={false} //set by default, but to be sure
                isClearable
                styles={colourStyles}
                options={options}
                onInputChange={onInputChange}
                onChange={onChange}
                value = {childTaskName}
                //  inputValue = {childTaskName}
                //  formatCreateLabel={userInput => `Save Task "${userInput}"`}
                noOptionsMessage = {() => null}
                placeholder = 'Enter task / search saved tasks'
                maxMenuHeight = {200}
                />
                {/* <div className='btn-checkbox-container '> */}
                    <form className = 'checkbox prompt-item'>
                        <label>
                            Save task?
                            <input type="checkbox" checked = {willSaveTask} onChange = {() => setWillSaveTask(!willSaveTask)}/>
                        </label>
                    </form>
                    <button className='start-task-button' onClick = {handleSubmit}>
                        Start Task
                    </button>
                    
                    
                {/* </div> */}
                
             </div>
        </div>
        
    )
}

export default TaskAdderPrompt;