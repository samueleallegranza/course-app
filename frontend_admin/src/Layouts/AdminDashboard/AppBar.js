import React from 'react';
import './AppBar.scss';

import Avatar from '../../Components/Avatar/Avatar';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import NotificationsIcon from '@material-ui/icons/Notifications';

const AppBar = () => {
    return (
        <div className="AppBar-container">
            <div className="element">
                <PowerSettingsNewIcon className="icon"/>
            </div>
            <div className="element">
                <NotificationsIcon className="icon" />
            </div>
            <div className="element">
                <Avatar />
            </div>
        </div>
    );
}

export default AppBar;