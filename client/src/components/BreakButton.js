import React, { Component, useState, useRef } from 'react';

const BreakButton = ({onBreak, continueTask, breakTask}) => {
    return(
        <div>
            <button className='button button-toggle-pause-task' onClick={onBreak ? continueTask : breakTask}>
                    {onBreak ? 'Continue Task' : 'Take a Break'}
            </button>
        </div>
    )
}

export default BreakButton;