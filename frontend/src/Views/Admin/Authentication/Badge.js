import React from 'react'
import "./Badge.scss";

const Badge = (props) => { 
    console.log(props.birth);

    const classNames = (props.printer_mode === 'true') ? "Badge Badge-PrinterModifier" : "Badge"

    return (
        <div className={classNames}>
            <div className="hole">&nbsp;</div>
            <div className="avatar">
                <img src={require('../../../Media/avatar.png').default}></img>
            </div>
            <div className="full_name">
                {props.full_name}
            </div>
            <div className="email">
                {props.email}
            </div>
            <div className="event">
                <span className="title">Event</span>
                <span className="name">{props.event}</span>
            </div>
        </div>
    );
}

export default Badge;