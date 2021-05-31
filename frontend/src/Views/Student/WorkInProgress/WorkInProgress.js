import React from 'react'
import './WorkInProgress.scss'
import Illustration from './Illustration.svg';

const WorkInProgress = () => {
    return (
        <div className="StudentContent WorkInProgress-Page">
            <img src={Illustration} alt="illustration fix"></img>
            <div className="Heading" >
                <h1 className="Heading">We are working on it!</h1>
            </div>
        </div>
    )
}

export default WorkInProgress;