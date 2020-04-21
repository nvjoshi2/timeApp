import React from 'react';
import Toolbar from './Toolbar';

const NavBar = (props) => {


    return (
        <div>

            <div className = "NavBar" style={{background: 'black'}}>
                <Toolbar/>
            </div>
            <main style={{marginTop: '64px'}}> 
            </main>
            
        </div>
    )
}

export default NavBar;