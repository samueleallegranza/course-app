import React, {useState, useEffect} from 'react';
import './Courses.scss';

import CourseElement from './CourseElement';

// Retrieve the list of scheduled events
async function getAll() {
    return fetch("/event/get_all")
        .then(response => response.json())
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

const Courses = (props) => {

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(loading) {
            if (events.length == 0) {
                // Get the event list
                getAll().then(res => {
                    setLoading(false)
                    setEvents(res);
                })
            }
        }
    }, [loading])

    return (
        <div className="StudentContent Courses-Page">
            <div className="Heading">
                <h1>Courses</h1>
                <p>We run one-day courses, consisting of multiple parallel tracks, to provide you with a flexible and tailor-made experience. </p>
            </div>
            <div className="CourseList">

                {
                    events.map((event, idx) => {
                        // date formatting
                        const date = new Date(event.day)
                        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
                        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
                        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
                        const nth = nthDaySuffix(da);
                        const formattedDate = `${mo} ${da}${nth}, ${ye}`;

                        return (<CourseElement
                            idevent={event.idevent}
                            name={event.name}
                            date={formattedDate}
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
    );
}

export default Courses