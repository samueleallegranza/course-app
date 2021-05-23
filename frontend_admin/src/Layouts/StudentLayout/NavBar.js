import React from 'react';
import './NavBar.scss';

import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="NavBar">
            <div className="Logo">
                <NavLink to={'/'}>
                    <span className="Left">Office</span>
                    <span className="Right">Talks</span>
                </NavLink>
            </div>
            <div className="Navigation">
                <NavLink to={'/courses'} className='link' activeClassName="active">
                    Courses
                </NavLink>
                <NavLink to={'/teachers'} className='link' activeClassName="active">
                    Teachers
                </NavLink>
                <NavLink to={'/contacts'} className='link' activeClassName="active">
                    Contacts
                </NavLink>
                <div className="divider">&nbsp;</div>
                <NavLink to={'/login/student'} className='link' activeClassName="active">
                    Log in
                </NavLink>
                <NavLink to={'/signup'} className='link button' activeClassName="active">
                    Sign up
                </NavLink>
            </div>

        </div>
    )
}

export default NavBar;