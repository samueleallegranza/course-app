import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SubElement.scss';

import Cookies from 'universal-cookie';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CourseSchedule from '../../../Components/CourseSchedule/CourseSchedule';

import DeleteIcon from '@material-ui/icons/Delete';


async function deleteSub(idevent, username) {
    await fetch("/event/del_subscription", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idevent: idevent,
            username: username
        })
    }).then(res => {
        if (res.status == 200) {
            window.location.reload();
        } else {
            return false;
        }
    })
}

const DeleteBtn = ({date, idevent}) => {
    const today = (new Date());
    const cookies = new Cookies();
    const username = cookies.get('username');

    if(date>today) {
        // future course
        return (
            <>
                <button className="button on" onClick={() => deleteSub(idevent, username)}>
                    <DeleteIcon />
                </button>
            </>
        );

    } else {
        // passed course / ongoing
        return (
            <>
                <button className="button off">
                    <DeleteIcon />
                </button>
            </>
        );

    }
}


const CourseElement = (props) => {

    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = () => {
        setCollapsed(!collapsed); // switch between 'true' and 'false'
    }

    return (
        <div className="Sub">
            <div className="SubMain">
                <div className="Title">{props.name}</div>
                <div className="Info Date">
                    <div className="label">Date</div>
                    <div className="value">{props.formattedDate}</div>
                </div>
                <div className="Info Level">
                    <div className="label">Level</div>
                    <div className="value">{props.difficulty}</div>
                </div>
                <div className="Delete">
                    <DeleteBtn date={props.date} idevent={props.idevent}/>
                </div>
                <div className="Expand" onClick={() => { handleCollapse() }}>
                    <ChevronRightIcon className={collapsed ? "arrow-open" : "arrow-close"}/>
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