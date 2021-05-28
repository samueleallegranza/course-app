import React from 'react';
import {NavLink} from 'react-router-dom';
import './SideNavbar.scss';

import PeopleIcon from '@material-ui/icons/People';
import RoomIcon from '@material-ui/icons/Room';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import MapIcon from '@material-ui/icons/Map';

const links = [
    {
        'name': "Users",
        'url': "/admin/users",
        'icon': PeopleIcon
    },
    // {
    //     'name': "Rooms",
    //     'url': "/admin/rooms",
    //     'icon': RoomIcon
    // },
    {
        'name': "Authentication",
        'url': "/admin/authentication",
        'icon': SubtitlesIcon
    },
    {
        'name': "Livemap",
        'url': "/admin/livemap",
        'icon': MapIcon
    },

]

const SideNavbar = () => {
    return(
        <div className="SideBar">
            <div className="Logo">
                <NavLink to={'/admin/users'}>
                    <span className="Left">Office</span>
                    <span className="Right">Talks</span>
                    <div className="AdminTag">Admin</div>
                </NavLink>
            </div>
            <div className="Links">

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
        </div>
    );
}

export default SideNavbar;