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
                        {schedule.tracks.map((track) => <th><div>track</div> track</th>)}
                        {/* <th><div>Excel</div> track</th>
                        <th><div>Word</div> track</th>
                        <th><div>PowerPoint</div> track</th> */}
                    </tr>
                    <tr>
                        <td className="time">8:00 AM - 11:00 AM</td>
                        <td className="meeting">
                            <div className="name">Hearth of software delivery</div>
                            <div className="info">A2 | Urs Hozle</div>
                        </td>
                        <td className="meeting">
                            <div className="name">Hearth of software delivery</div>
                            <div className="info">A2 | Urs Hozle</div>
                        </td>
                        <td className="meeting">
                            <div className="name">Hearth of software delivery</div>
                            <div className="info">A2 | Urs Hozle</div>
                        </td>
                    </tr>
                    <tr>
                        <td className="time">11:00 AM - 1:00 PM</td>
                        <td className="meeting">
                            <div className="name">Hearth of software delivery</div>
                            <div className="info">A2 | Urs Hozle</div>
                        </td>
                        <td className="meeting">
                            <div className="name">Hearth of software delivery</div>
                            <div className="info">A2 | Urs Hozle</div>
                        </td>
                        <td className="meeting">
                            <div className="name">Hearth of software delivery</div>
                            <div className="info">A2 | Urs Hozle</div>
                        </td>
                    </tr>
                    <tr>
                        <td className="time">1:00 AM - 2:00 PM</td>
                        <td colSpan="3" className="BreakRow">
                            <div className="BreakBox">
                                <div className="name">Lunch Break</div>
                                <div className="info">Restaurant</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="time">11:00 AM - 1:00 PM</td>
                        <td className="meeting">
                            <div className="name">Hearth of software delivery</div>
                            <div className="info">A2 | Urs Hozle</div>
                        </td>
                        <td className="meeting">
                            <div className="name">Hearth of software delivery</div>
                            <div className="info">A2 | Urs Hozle</div>
                        </td>
                        <td className="meeting">
                            <div className="name">Hearth of software delivery</div>
                            <div className="info">A2 | Urs Hozle</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    };
}

export default CourseSchedule;