import React, {useState} from 'react';
import './ParticipantsList.scss';

import ParticipantModal from './ParticipantModal';

const ParticipantsList = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleModalOpen = (participant) => {
        setModalData(participant)
        setModalOpen(true);
    }
    const handleModalClose = () => {
        setModalOpen(false);
    }

    const present = []
    const missing = []
    for(let i=0; i<props.participants.length; i++) {
        if(props.participants[i].codnfc == null) {
            missing.push(props.participants[i])
        } else {
            present.push(props.participants[i])
        }
    }
    
    return (
        <div className="ParticipantsList">
            <ParticipantModal
                participant={modalData}
                open={modalOpen}
                onClose={handleModalClose}
                ongoingEvent={props.ongoingEvent}
                ongoingEventName={props.ongoingEventName}
                updateParticipants={props.updateParticipants}
            />
            
            <h2>Missing</h2>
            <div>
                {
                    missing.map((participant, idx) => {
                        return (
                            <div>
                                <span>
                                    {participant.full_name} - {participant.username} -
                                    <button onClick={() => handleModalOpen(participant)}>Confirm presence</button>
                                </span>
                            </div>
                        )
                    })
                }
            </div>

            <h2>Present</h2>
            <div>
                {
                    present.map((student, idx) => {
                        return (
                            <div>
                                <span>
                                    {student.full_name} - {student.username}
                                </span>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    );
}

export default ParticipantsList;