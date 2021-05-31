import React, { useState, useEffect } from 'react';
import mqttSetup from './mqtt';

import Rooms from '../Rooms';

// get the list of rooms
async function getRooms() {
    const response = await fetch("/room/get_all", {
        method: 'GET',
    })
    const json = await response.json();
    return json
}

// get the screenshot of participant positions
async function getScreenshot(idEvent) {
    const response = await fetch("/event/get_screenshot", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idevent: idEvent })
    })
    const json = await response.json();
    return json
}

// parse the screenshot adopting  the scheme {idpart1: idroom, idpart2: idroom, ...}
const parseScreenshot = (screenshot) => {    
    let participants = {};
    let idroom;
    screenshot.forEach(part => {
        idroom = part.nodata ? 0 : part.idroom
        participants[part.idparticipant] = idroom
    });
    return participants
}


const LiveMap = () => {
    const [mqttConn, setMqttConn] = useState(null);
    const [rooms, setRooms] = useState([{idroom: 0, name: 'Corridors', codroomtype: 2}]);
    const [partPos, setPartPos] = useState({});
    
    // update a participant position
    const updatePartPos = (idpart, idroom, direction) => {
        console.log("current part pos (before update): ", partPos)
        const newPartPos = {...partPos};       // necessary in order to trigger state change
        if(direction == 0) {
            newPartPos[idpart] = 0             // go to corridors
        } else if(direction == 1) {
            newPartPos[idpart] = idroom        // enter the room
        }
        setPartPos(newPartPos);
    }

    useEffect(() => {
        if(!mqttConn) {
            setMqttConn("loading");
            mqttSetup(setMqttConn, updatePartPos);  // Connect to Broker and subscribe to topics
            getRooms().then(res => setRooms(rooms.concat(res))).then(
                getScreenshot(1).then(res => {
                    setPartPos(parseScreenshot(res))
                })
            )
        }
        console.log(`${!mqttConn} part pos changed: `, partPos);
    }, [partPos])
    
    return(
        <div className="Content-default Authentication-page">
            <h1>Livemap</h1>
            <Rooms rooms={rooms} partPos={partPos}/>
            <button onClick={() => updatePartPos(1, 6, 1)}></button>
            <button onClick={() => updatePartPos(1, 6, 0)}></button>
        </div>
    )
}

export default LiveMap