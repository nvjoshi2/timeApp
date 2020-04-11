import React from 'react';
import SavedTaskList from '../SavedTaskList';
import './SavedTaskPage.css'
const SavedTaskPage = (props) => {

    return (
        <div className = 'saved-task-page-container'>
            <h2>Delete Unwanted Saved Tasks</h2>
            <SavedTaskList/>
        </div>
    )
}

export default SavedTaskPage;