import React, { useState, useEffect } from 'react';
import './LiveMap.scss';

import mqtt from 'mqtt'

import Rooms from './Rooms';

// Check if there's an ongoing event
// if it is, returns the id of the event
const checkOngoingEvent = () => {
    console.log('Check ongoing event')
    return fetch("/event/ongoing")
        .then(response => response.json())
}

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
        if (part.nodata) {
            idroom = 0              // participant with no movement history
        } else if (part.direction == 0) {
            idroom = 0              // participant that went out of a room (is in corridors)
        } else {
            idroom = part.idroom    // participant that is in a room
        }
        participants[part.idparticipant] = idroom
    });
    return participants
}


const LoadingEvent = (props) => {
    if(props.ongoingEvent === 'pending') {
        return (<p>Loading...</p>)
    } else if(props.ongoingEvent === 'none') {
        return (<p>No ongoing event</p>)
    } else {
        return props.children
    }
}


const LiveMap = () => {
    const [ongoingEvent, setOngoingEvent] = useState('pending');
    const [rooms, setRooms] = useState([{idroom: 0, name: 'Corridors', codroomtype: 0}]);
    const [partPos, setPartPos] = useState({});
    const [loadedRooms, setLoadedRooms] = useState(false)
    const [loadedPartPos, setLoadedPartPos] = useState(false)
    const [loadedMqtt, setLoadedMqtt] = useState(false)
    const [mqttLastMsg, setMqttLastMsg] = useState(null)

    // update a participant position
    const updatePartPos = (idpart, idroom, direction) => {
        console.log("PartPos BEFORE update: ", partPos)
        const newPartPos = {...partPos};       // necessary in order to trigger state change
        if(direction == 0) {
            newPartPos[idpart] = 0             // go to corridors
        } else if(direction == 1) {
            newPartPos[idpart] = idroom        // enter the room
        }
        console.log("PartPos AFTER update: ", newPartPos)
        setPartPos(newPartPos)
    }

    const mqttSetup = () => {
        const mqtt_ip = 'ws://168.119.189.237:9001'

        console.log("Trying to connect to MQTT Broker...");
        const mqttConn = mqtt.connect(mqtt_ip);

        mqttConn.on('connect', () => {
            console.log("Connected to MQTT Broker!");
            mqttConn.subscribe("movements")
        })

        mqttConn.on('message', (topic, message) => {
            if (topic === "movements") {
                const mess = JSON.parse(message)
                console.log(`New movement of participant ${mess.student_name} at room ${mess.room_name}. Direction: ${mess.direction}`)
                console.log(mess)
                setMqttLastMsg(mess)
            }
        })
    }

    useEffect(() => {
        if(ongoingEvent === 'pending') {
            checkOngoingEvent().then(res => {
                console.log(res)
                if(res.idevent) {
                    setOngoingEvent(res.idevent)
                } else {
                    setOngoingEvent('none')
                }
            })
        } else if (ongoingEvent != "pending" && ongoingEvent != 'none') {
            if (!loadedRooms) {
                getRooms().then(res => {
                    setLoadedRooms(true);
                    setRooms(rooms.concat(res));
                })
            }
            if (!loadedPartPos) {
                getScreenshot(ongoingEvent).then(res => {
                    setLoadedPartPos(true);
                    setPartPos(parseScreenshot(res))
                })
            }
            if (loadedRooms && loadedPartPos) {
                if (!loadedMqtt) {
                    setLoadedMqtt(true);
                    mqttSetup()
                } else {
                    // new mqtt message arrived (mqttLastMsg state change)
                    updatePartPos(mqttLastMsg.idparticipant, mqttLastMsg.idroom, mqttLastMsg.direction)
                }
            }
        }
    }, [mqttLastMsg, loadedRooms, loadedPartPos, ongoingEvent])
    
    return(
        <div className="Content-default LiveMap-Page">
            <h1>Livemap</h1>
            <LoadingEvent ongoingEvent={ongoingEvent}>
                <Rooms rooms={rooms} partPos={partPos}/>
            </LoadingEvent>
        </div>
    )
}

export default LiveMap