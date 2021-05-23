import React, {useState, useEffect} from 'react';
import './CourseSchedule.scss';

async function getSchedule(idtemplate) {
    const response = await fetch("/event/get_schedule", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idtemplate: idtemplate })
    })
    const json = await response.json();
    return json;
}


const formatTime = (time) => {
    var t = time.split(":");
    var formattedDate = new Date(1970, 1, 1, t[0], t[1], t[2]);

    var date = new Date(formattedDate);
    return date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}


const CourseSchedule = (props) => {

    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        if(!schedule) {
            getSchedule(props.idtemplate).then((schedule) => {
                setSchedule(schedule)
            })
        }
    }, [schedule])

    if(!schedule) {
        return ("Loading...")
    } else {
        return (
            <table className="ScheduleTable">
                <colgroup>
                    <col className="time" />
                    <col className="meeting" />
                    <col className="meeting" />
                    <col className="meeting" />
                </colgroup>
                <tbody>
                    <tr>
                        <th></th>
                        {schedule.tracks.map((track) => <th><div>{track}</div> track</th>)}
                    </tr>
                    {
                        schedule.schedule.map(row => {
                            return (
                                <tr>
                                    <td className="time">
                                        {formatTime(row.time_start)} -
                                        {formatTime(row.time_finish)}
                                    </td>
                                    {
                                        !row.is_break ? (
                                            row.events.map(event => {
                                                return(
                                                    <td className="meeting">
                                                        <span className="name">{event.lesson_name}</span>
                                                        <span className="info">
                                                            {event.room_name} | {event.teacher_name}
                                                        </span>
                                                    </td>
                                                )
                                            })
                                        ) : (
                                            <td colSpan="3" className="BreakRow">
                                                <div className="BreakBox">
                                                    <div className="name">Lunch Break</div>
                                                    <div className="info">Restaurant</div>
                                                </div>
                                            </td>
                                        ) 
                                    }
                                </tr>
                            )                            
                        })
                    }
                </tbody>
            </table>
        )
    };
}

export default CourseSchedule;