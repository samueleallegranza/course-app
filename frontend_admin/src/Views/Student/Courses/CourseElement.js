import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseElement.scss';

import PeopleIcon from '@material-ui/icons/People';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import CourseSchedule from './CourseSchedule';


const CourseElement = (props) => {

    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = () => {
        setCollapsed(!collapsed); // switch between 'true' and 'false'
    }

    return (
        <div
            className="Course" 
            onClick={() => {handleCollapse()}}
        >
            <div className="CourseMain">
                <div className="Title">{props.name}</div>
                <div className="Info Date">
                    <div className="label">Date</div>
                    <div className="value">{props.date}</div>
                </div>
                <div className="Info Level">
                    <div className="label">Level</div>
                    <div className="value">{props.difficulty}</div>
                </div>
                <div className="Spots">
                    <PeopleIcon />
                    <span>{props.occupied_spots}/{props.spots}</span>
                </div>
                <div className="Subscribe">
                    <Link to='/signup' className="button">Subscribe</Link>
                </div>
                <div className="Expand">
                    <ChevronRightIcon 
                        className={ collapsed ? "arrow-open" : "arrow-close"}
                    />
                </div>
            </div>
                {
                    collapsed ? 
                    <div className="CourseSchedule">
                        <CourseSchedule idtemplate={props.idtemplate} />
                    </div>
                    : null
                }
        </div>
    )
}

export default CourseElement;