import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CourseElement.scss';

import Cookies from 'universal-cookie';

import PeopleIcon from '@material-ui/icons/People';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import CourseSchedule from '../../../Components/CourseSchedule/CourseSchedule';


const subscribeUser = (idevent, username) => {
    fetch("/event/subscribe", {
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "idevent": idevent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.status == 200) {
            window.location.reload();
        } else {
            return false;
        }
    })
}

async function isSubscribed(idevent, username) {
    const response = await fetch("/event/is_subscribed", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: username,
            idevent: idevent
        })
    })
    const isSub = await response.json();
    return isSub
}

const SubscribeBtn = ({idevent, alertTrigger}) => {
    const cookies = new Cookies();
    const role = cookies.get('role');
    const username = cookies.get('username');

    const [loading, setLoading] = useState(true)
    const [component, setComponent] = useState(null)

    const subscribeHandler = () => {
        subscribeUser(idevent, username);
    }

    useEffect(() => {
        if(loading) {
            if (role == "student") {
                // user is logged in and is a student
                isSubscribed(idevent, username).then(res => {
                    if (res.isSubscribed) {
                        // user is already subscribed
                        setComponent(<><a className="button off">Subscribed</a></>)
                    } else {
                        // user is not subscribed yet
                        setComponent(<><a className="button on" onClick={subscribeHandler}>Subscribe</a></>)
                    }
                });
            } else {
                // user not logged in
                setComponent(<><Link className="button on" to="/signup">Subscribe</Link></>)
            }
            setLoading(false);
        }
    }, [loading])

    return component
}

const FullBtn = () => {
    return (
        <><a className="button off">Event full</a></>
    )
}


const CourseElement = (props) => {

    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = () => {
        setCollapsed(!collapsed); // switch between 'true' and 'false'
    }

    return (
        <div className="Course">
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
                <div className="Button">
                    {
                    (props.occupied_spots < props.spots) ? 
                        <SubscribeBtn idevent={props.idevent} alertTrigger={props.alertTrigger}/> :
                        <FullBtn />
                    }
                </div>
                <div 
                    className="Expand"
                    onClick={() => { handleCollapse() }}
                >
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