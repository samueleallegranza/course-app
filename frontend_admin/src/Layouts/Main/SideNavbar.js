import React from 'react';
import {NavLink} from 'react-router-dom';
import './SideNavbar.scss';

import PeopleIcon from '@material-ui/icons/People';
import RoomIcon from '@material-ui/icons/Room';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

const links = [
    {
        'name': "Users",
        'url': "/users",
        'icon': PeopleIcon
    },
    {
        'name': "Teachers",
        'url': "/teachers",
        'icon': LocalLibraryIcon
    },
    {
        'name': "Rooms",
        'url': "/rooms",
        'icon': RoomIcon
    },
]

const SideNavbar = () => {
    return(
        <div className="SideNavbar-container">
            {
                links.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <NavLink to={link.url} className='element' activeClassName="active">
                            <Icon className="icon" />
                            <span className="text">{link.name}</span>
                        </NavLink>
                    )
                })
            }
        </div>
    );
}

export default SideNavbar;