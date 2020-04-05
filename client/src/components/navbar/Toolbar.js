import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Toolbar.css';
import { logOut } from '../../actions/authActions';
import { clearTasks } from '../../actions/taskActions';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../../Logoclock.png';
const Toolbar = props => {
    const dispatch = useDispatch();
    const handleLogOut = (event) => {
        console.log('handleLogOut called')
        dispatch(logOut())
        dispatch(clearTasks())
    }
    const location = useLocation();
    const isActive = (linkPath) => {
        if (location.pathname === linkPath) {
            return 'active'
        } else {
            return 'inactive'
        }
    }
    const isLogged = useSelector(state => state.authReducer.isLogged)
    return(
    // <header className="toolbar">
        <nav className="toolbar__navigation">
            {location.pathname != '/' && <div className="toolbar__logo"><Link to='/home'><img className = 'logo-small' src={Logo}/></Link></div>}
            <div className="spacer"/>
            <div className="toolbar_navigation-items">
                <ul>
                    {isLogged && <li><Link className={isActive('/home')} to='/home'>Home</Link></li>}
                    {isLogged && <li><Link className={isActive('/history')} to='/history'>History</Link></li>}
                    {isLogged && <li><Link className={isActive('/logout')} to='/login'><span onClick={handleLogOut}>Log Out</span></Link></li>}
                    {!isLogged && <li><Link className={isActive('/login')} to='/login'>Log In</Link></li>}
                    {!isLogged && <li><Link className={isActive('/register')} to='/register'>Register</Link></li>}
                </ul>
            </div>
        </nav>
    // </header>
    )
}

export default Toolbar;


