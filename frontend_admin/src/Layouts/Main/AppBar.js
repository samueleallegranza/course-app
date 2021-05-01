import React from 'react';
import './AppBar.scss';

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
                <img className="avatar" src={require('../../media/avatar.png').default} alt="logo"/>
            </div>
        </div>
    );
}

export default AppBar;