import React, {useState, useEffect} from 'react';
import './Subscriptions.scss';

import Cookies from 'universal-cookie';

import SubElement from './SubElement';

// Retrieve the list of events which the user is subscribed to
async function getAll(username) {
    const response = await fetch("/event/get_subscriptions", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
        })
    })
    const res = await response.json();
    return res
}

// Helper function for nth suffix to day
const nthDaySuffix = function (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

const Subscriptions = (props) => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loading) {
            // Get the event list
            const cookies = new Cookies();
            const username = cookies.get('username');
            getAll(username).then(res => {
                setLoading(false)
                setEvents(res);
            })
        }
    }, [loading])

    return (
        <div className="StudentContent Subscriptions-Page">
            <div className="Heading">
                <h1>Subscriptions</h1>
            </div>
            <div className="SubList">

                {
                    events.map((event, idx) => {
                        // date formatting
                        const date = new Date(event.day)
                        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
                        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
                        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
                        const nth = nthDaySuffix(da);
                        const formattedDate = `${mo} ${da}${nth}, ${ye}`;

                        return (<SubElement
                            idparticipant={event.idparticipant}
                            idevent={event.idevent}
                            name={event.name}
                            date={date}
                            formattedDate={formattedDate}
                            spots={event.spots}
                            difficulty={event.difficulty}
                            occupied_spots={event.occupied_spots}
                            idtemplate={event.idtemplate}
                            alertTrigger={props.alertTrigger}
                        />)
                    })
                }

            </div>

        </div>
    )
}

export default Subscriptions;