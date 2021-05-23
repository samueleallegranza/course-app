import React from 'react'
import './StudentAuthLayout.scss'
import '../../Style/Student_Baseline.scss';

import { NavLink } from 'react-router-dom';

const StudentAuthLayout = (props) => {
    return (
        <div>
            <div className="NavBar">
                <div className="Logo">
                    <NavLink to={'/'}>
                        <span className="Left">Office</span>
                        <span className="Right">Talks</span>
                    </NavLink>
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default StudentAuthLayout