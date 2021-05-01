import React from 'react';
import {Link} from 'react-router-dom';
import './SideNavbar.scss';

import PeopleIcon from '@material-ui/icons/People';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const links = [
    {
        name: "Users",
        path: "/users",
        icon: PeopleIcon
    },
    {
        'name': "Rooms",
        'path': "/rooms",
        'icon': MeetingRoomIcon
    }
]

const SideNavbar = () => {
    return(
        <div className="SideNavbar-container">
            {
                links.map((element, index) => {
                    return (
                        <div>{element.name}</div>
                    )
                })
            }
            <div className="element">
                <Link to="/users">Users</Link>
            </div>
            <div className="element">
                <Link to="/teachers">Teachers</Link>
            </div>
            <div className="element">
                <Link to="/rooms">Rooms</Link>
            </div>
        </div>
    );
}

export default SideNavbar;