import React, { useState, useEffect } from 'react';
import './Authentication.scss'

import ParticipantsList from './ParticipantsList'

// Check if there's an ongoing event
// if it is, returns the id of the event
const checkOngoingEvent = () => {
    console.log('check ongoing event')
    return fetch("/event/ongoing")
        .then(response => response.json())
}

// Get participants of a certain event
const getEventParticipants = (eventId) => {
    return fetch("/event/get_participants", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({eventid: eventId})
    })
        .then(response => response.json())
}

const Loading = () => {
    return(<div>loading...</div>)
}

const NoOngoingEvent = () => {
    return (<div>No ongoing event</div>)
}

const Authentication = () => {
    const [ongoingEvent, setOngoingEvent] = useState('pending');
    const [ongoingEventName, setOngoingEventName] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if (ongoingEvent === 'pending') {
            checkOngoingEvent().then((response) => {
                if(response.idevent) {
                    console.log(response)
                    setOngoingEvent(response.idevent)
                    setOngoingEventName(response.name)
                } else {
                    setOngoingEvent(null)
                }
            });
        } else if (ongoingEvent !== null) {
            updateParticipants();
        }
    }, [ongoingEvent])
    
    const updateParticipants = () => {
        console.log(`getting participants of event id ${ongoingEvent}`);
        getEventParticipants(ongoingEvent).then((response) => {
            setParticipants(response);
        })
    }

    const renderSwitch = () => {
        if (ongoingEvent === 'pending') {
            return <Loading />
        } else if (ongoingEvent === null) {
            return <NoOngoingEvent />
        } else {
            return <ParticipantsList 
                participants={participants}
                updateParticipants={updateParticipants}
                ongoingEvent={ongoingEvent}
                ongoingEventName={ongoingEventName}
            />
        }
    }

    return (

        <div className="Content-default Authentication-page">
            <h1>Authentication</h1>
            { renderSwitch() }
        </div>
    )
}

export default Authentication;