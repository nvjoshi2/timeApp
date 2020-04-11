import React from 'react';

const BreakButton = ({onBreak, continueTask, breakTask}) => {
    return(
        <div>
            <button className='join-button-nf' onClick={onBreak ? continueTask : breakTask}>
                    {onBreak ? 'Continue Task' : 'Take a Break'}
            </button>
        </div>
    )
}

export default BreakButton;