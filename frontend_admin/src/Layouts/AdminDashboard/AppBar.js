import React from 'react';
import './AppBar.scss';

import Cookies from 'universal-cookie';

import { NavLink } from 'react-router-dom';
import Avatar from '../../Components/Avatar/Avatar';
import Dropdown from '../../Components/Dropdown/Dropdown';

const AppBar = () => {
    const cookies = new Cookies();
    const username = cookies.get('username');

    return (
        <div className="NavBar-cont">
            <div className="Status">
            </div>
            <div className="Navigation">
                <NavLink to={'/subscriptions'} className='link' activeClassName="active">
                    MQTT Broker
                </NavLink>
                <NavLink to={'/certificates'} className='link' activeClassName="active">
                    API Backend
                </NavLink>
                <div className="divider">&nbsp;</div>
                <div className="arrow">
                    <Dropdown />
                </div>
                <a className='link' activeClassName="active">
                    {username}
                </a>
                <div className="avatar">
                    <img src={require('../../Media/avatar.png').default} alt="avatar" />
                </div>
            </div>

        </div>
    );
}

export default AppBar;