import React from 'react';
import './Main.scss'

import SideNavbar from './SideNavbar';
import AppBar from './AppBar';

// [!] ADD ADMIN STYLES TO EVERY PAGE OF ADMIN
import '../../Style/Admin_Baseline.scss'
import '../../Style/Admin_Content-globals.scss'

const Main = (props) => {
    return(
        <div className="Window">
            <div className="SideNavbar">
                <SideNavbar />
            </div>
            <div className="Page">
                <AppBar />
                <div className="Content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Main;