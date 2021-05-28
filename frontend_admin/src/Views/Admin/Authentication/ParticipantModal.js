import React, {useEffect, useState} from 'react';
import Modal from '@material-ui/core/Modal';

import Badge from './Badge';

import './ParticipantModal.scss'

async function getNfcAll() {
    console.log('get nfc tags list')
    const response = await fetch("/nfc/get_all")
    const json = await response.json();
    return json;
}

async function getNfcUsed(idEvent) {
    console.log('get nfc used list')
    const response = await fetch("/nfc/get_used", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idevent: idEvent })
    })
    const json = await response.json();
    return json;
}

async function getAvailableNfc(idEvent) {
    const nfc_all = await getNfcAll();
    const nfc_used = await getNfcUsed(idEvent);
    const available_nfc = nfc_all.filter((elm) => {
        return !nfc_used.includes(elm)
    })
    console.log(available_nfc);
    return available_nfc;
}

async function setPresence(idParticipant, idNfc) {
    console.log('set presence', idParticipant, idNfc)
    const response = await fetch("/event/set_presence", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idparticipant: idParticipant,
            idnfc: idNfc
        })
    })
    const json = await response.json();
    return json;
}

const SelectNfcTag = (props) => {
    const handleChange = (e) => {
        props.setSelectedNfc(e.target.value)
    }

    return (
        <>
            <select className="Select" onChange={handleChange}>
                {
                    props.availableNfc.map((elm, idx) => {
                        return <option value={elm}>Card {elm}</option>
                    })
                }
            </select>
        </>
    )
}


const ParticipantModal = (props) => {
    
    const [availableNfc, setAvailableNfc] = useState([]);
    const [selectedNfc, setSelectedNfc] = useState(null);

    const [isBadgeLoading, setIsBadgeLoading] = useState(true);

    const updateAvailableNfc = () => {
        getAvailableNfc(props.ongoingEvent)
            .then(result => {
                setAvailableNfc(result)
            })
    }

    const confirmPresence = () => {
        setPresence(props.participant.idparticipant, selectedNfc);
        props.updateParticipants();
        props.onClose();
    }

    const printBadge = (id) => {
        const iframe = document.frames
            ? document.frames[id]
            : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;

        iframe.focus();
        iframeWindow.print();

        return false;
    }

    useEffect(() => {
        updateAvailableNfc();
    }, [props.participant])

    if(props.participant) {
        return (
            <div>
                <Modal
                    open={props.open}
                    onClose={props.onClose}
                    className="Modal"
                >
                    <div className="ModalContent">
                        <h1>{props.participant.full_name}</h1>
                        
                        <div className="BadgeContainer">
                            <h2>Badge</h2>
                            <iframe
                                id="badge"
                                src={`/admin/badge?printer_mode=true&full_name=${props.participant.full_name}&email=${props.participant.email}&birth=${props.participant.birth}&event=${props.ongoingEventName}`}
                                style={{ display: 'none' }}
                                title="Badge"
                                onLoad={() => {setIsBadgeLoading(false)}}
                            />
                            <div className="BadgeWrapper">
                                <Badge
                                    full_name={props.participant.full_name}
                                    email={props.participant.email}
                                    birth={props.participant.birth}
                                    event={props.ongoingEventName}
                                />
                            </div>
                            <button 
                                className="btn"
                                onClick={() => printBadge('badge')}
                            >
                                {isBadgeLoading ? "loading..." : "Print"}
                            </button>
                        </div>

                        <div className="Nfc">
                            <h2>NFC Card</h2>
                            <div className="SelectNFc">
                                <SelectNfcTag
                                    availableNfc={availableNfc}
                                    setSelectedNfc={setSelectedNfc}
                                    selectedNfc={selectedNfc}
                                />
                            </div>
                            <button 
                                className="btn" 
                                onClick={confirmPresence}
                            >
                                confirm presence
                            </button>
                        </div>
                                                
                    </div>
                </Modal>
            </div>
        );
    } else {
        return (<div></div>)
    }
}

export default ParticipantModal;