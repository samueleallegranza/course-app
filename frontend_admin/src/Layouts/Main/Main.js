import React from 'react';
import './Main.scss'

import SideNavbar from './SideNavbar';
import AppBar from './AppBar';

const Main = (props) => {
    return(
        <div className="Background">
            <div className="Window">
                <div className="Logo">
                    <span>Office.</span>
                </div>
                <div className="AppBar">
                    <AppBar />
                </div>
                <div className="SideNavbar">
                    <SideNavbar />
                </div>
                <div className="Content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Main;