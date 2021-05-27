import React from 'react';
import './NavBar.scss';

import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Dropdown from './Dropdown';

// Check if user is logged in and its role is 'student'
const isStudentLoggedIn = () => {
    const cookies = new Cookies();
    const role = cookies.get('role');
    const username = cookies.get('username');
    return role == "student" ? username : false
}

// Login and sign up buttons for people that is not logged in yet 
const PublicNav = () => {
    return (
        <>
            <div className="divider">&nbsp;</div>
            <NavLink to={'/login/student'} className='link' activeClassName="active">
                Log in
            </NavLink>
            <NavLink to={'/signup'} className='link button' activeClassName="active">
                Sign up
            </NavLink>
        </>
    )
}

// Private links and user info for logged in students
const PrivateNav = ( {username} ) => {
    return (
        <>
            <div className="divider">&nbsp;</div>
            <NavLink to={'/subscriptions'} className='link' activeClassName="active">
                Subscriptions
            </NavLink>
            <NavLink to={'/certificates'} className='link' activeClassName="active">
                Certificates
            </NavLink>
            <div className="divider">&nbsp;</div>
            <div className="arrow">
                {/* <ExpandMoreIcon /> */}
                <Dropdown />
            </div>
            <a className='link' activeClassName="active">
                {username}
            </a>
            <div className="avatar">
                <img src={require('../../Media/avatar.png').default} alt="avatar" />
            </div>

            {/* <NavLink to={'/signup'} className='link button' activeClassName="active">
                History
            </NavLink> */}
        </>
    )
}

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

                {
                    isStudentLoggedIn() ? 
                        <PrivateNav username={isStudentLoggedIn()} /> :
                        <PublicNav />
                }
            </div>

        </div>
    )
}

export default NavBar;