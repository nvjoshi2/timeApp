import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Toolbar.css';
import { logOut } from '../../actions/authActions';
import { clearTasks } from '../../actions/taskActions';
import { useSelector, useDispatch } from 'react-redux';
const Toolbar = props => {
    const dispatch = useDispatch();
    const handleLogOut = (event) => {
        console.log('handleLogOut called')
        dispatch(logOut())
        dispatch(clearTasks())
    }
    return(
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div></div>
            <div className="toolbar__logo"><Link to='/home'>TimeIt</Link></div>
            <div className="spacer"/>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/history'>History</Link></li>
                    <li><Link to='/'><span onClick={handleLogOut}>Log Out</span></Link></li>
                </ul>
            </div>
        </nav>
    </header>
    )
}

export default Toolbar;