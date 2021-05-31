import React from 'react';

import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import ClassIcon from '@material-ui/icons/Class';

import './Rooms.scss';

const Rooms = (props) => {
    
    const printParticipants = (curr_idroom) => {
        const partList = Object.keys(props.partPos)
        const roomList = Object.values(props.partPos)

        let jsx = []

        partList.map((partId, index) => {
            if (roomList[index] == curr_idroom) {
                jsx.push(<div className="Participant">{partId}</div> )
            }
        })

        return jsx
    }

    const printRooms = () => {
        return props.rooms.map((room, idx) => {
            let RoomIcon = null;
            if (room.codroomtype == 1) {
                RoomIcon = ClassIcon;
            } else if (room.codroomtype == 2) {
                RoomIcon = EmojiFoodBeverageIcon;
            }

            let roomTypeClass = (room.codroomtype == 0) ? "Corridor" : "Standard"
            return (
                <div className={`Room ${roomTypeClass}`}>
                    <div className="Identifier">
                        <span className="Icon"> { RoomIcon ? <RoomIcon /> : null } </span>
                        <span className="Name"> {room.name} </span>
                    </div>
                    <div className="Participants">
                        {printParticipants(room.idroom)}
                    </div>
                </div>
            )
        })
    }

    return(
        <div className="LiveMap-Rooms">
            {
                props.rooms ? printRooms() : null
            }
        </div>
    )
}

export default Rooms