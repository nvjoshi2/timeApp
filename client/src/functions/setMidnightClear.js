import React from 'react';
// import { dispatch } from 'react-redux';
import { clearTasks } from '../actions/taskActions';
import { myStore } from '../index';
const setMidnightClear = () => {

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    var now = new Date();
    var midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0)

    var nextMidnight = midnight.addDays(1);
    
    var msToMidnight = nextMidnight - now
    
    console.log(msToMidnight);
    setInterval(() => {
        myStore.dispatch(clearTasks())
    }, msToMidnight)
}

export default setMidnightClear;