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
        window.location.reload();       // BAD PRACTICE!
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
                                <div className="User ParticipantsList-dimensions">
                                    <img className="Avatar" src={require('../../../Media/avatar.png').default} />
                                    <div className="User">
                                        <div className="Name">{participant.full_name}</div>
                                        <div className="Email">{participant.email}</div>
                                    </div>
                                    <div className="Controls">
                                        <button 
                                            className="Confirm"
                                            onClick={() => handleModalOpen(participant)}
                                        >
                                            Confirm presence
                                        </button>
                                    </div>
                                </div>
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
                                <div className="User ParticipantsList-dimensions">
                                    <img className="Avatar" src={require('../../../Media/avatar.png').default} />
                                    <div className="User">
                                        <div className="Name">{student.full_name}</div>
                                        <div className="Email">{student.email}</div>
                                    </div>
                                    <div className="Controls">
                                        <code>NFC Card: {student.codnfc}</code>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    );
}

export default ParticipantsList;