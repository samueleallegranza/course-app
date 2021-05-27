import React, {useState, useEffect} from 'react';
import './CertificateElement.scss';

import Cookies from 'universal-cookie';

import PrintIcon from '@material-ui/icons/Print';

// Retrieve the list of lessons of a particular event
async function getLessons(idevent, username) {
    const response = await fetch("/event/get_lessonlist", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            idevent: idevent
        })
    })
    const res = await response.json();
    return res
}


const HistoryElement = (props) => {
    const presence = props.lesson.partial ? "Partial" : "Complete";
    return (
        <div className="HistoryElement">
            <div className="Line">&nbsp;</div>
            <div className="Title">
                <span className="Name">{props.lesson.lesson_name}</span>
                <span className={`Presence ${presence}`}>
                    {presence}
                </span>
            </div>
            <div className="Info Room">
                <div className="label">Room</div>
                <div className="value">{props.lesson.room_name}</div>
            </div>
            <div className="Info Teacher">
                <div className="label">Teacher</div>
                <div className="value">{props.lesson.teacher_name}</div>
            </div>
        </div>
    )
}

const CertificateElement = (props) => {
    const [lessons, setLessons] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loading) {
            const cookies = new Cookies()
            const username = cookies.get('username')
            getLessons(props.idevent, username).then(less => {
                const clonedLess = [...less];
                setLessons(clonedLess);
                setLoading(false);
            });
        }
    }, [loading])


    return (
        <div className="Certificate">
            <div className="CertMain">
                <div className="Title">{props.name}</div>
                <div className="Info Date">
                    <div className="label">Date</div>
                    <div className="value">{props.date}</div>
                </div>
                <div className="Info Level">
                    <div className="label">Level</div>
                    <div className="value">{props.difficulty}</div>
                </div>
                <div className="Button">
                    <button className="button on">
                        <PrintIcon />
                    </button>
                </div>
            </div>
            <div className="CertHistory">
                {
                    loading ? null : (
                        lessons.map(lesson => <HistoryElement lesson={lesson} />)
                    )
                }
            {/*    <div className="HistoryElement">
                    <div className="Line">&nbsp;</div>
                    <div className="Title">
                        <span className="Name">{props.lessons[0].name}</span>
                        <span className={`Presence ${props.lessons[0].presence}`}>
                            {props.lessons[0].presence}
                        </span>
                    </div>
                    <div className="Info Room">
                        <div className="label">Room</div>
                        <div className="value">{props.lessons[0].room}</div>
                    </div>
                    <div className="Info Teacher">
                        <div className="label">Teacher</div>
                        <div className="value">{props.lessons[0].teacher}</div>
                    </div>
                </div>

                <div className="HistoryElement">
                    <div className="Line">&nbsp;</div>
                    <div className="Title">
                        <span className="Name">{props.lessons[1].name}</span>
                        <span className={`Presence ${props.lessons[1].presence}`}>
                            {props.lessons[1].presence}
                        </span>
                    </div>
                    <div className="Info Teacher">
                        <div className="label">Teacher</div>
                        <div className="value">{props.lessons[1].teacher}</div>
                    </div>
                    <div className="Info Room">
                        <div className="label">Room</div>
                        <div className="value">{props.lessons[1].room}</div>
                    </div>
                </div>

                <div className="HistoryElement">
                    <div className="Line">&nbsp;</div>
                    <div className="Title">
                        <span className="Name">{props.lessons[2].name}</span>
                        <span className={`Presence ${props.lessons[2].presence}`}>
                            {props.lessons[2].presence}
                        </span>
                    </div>
                    <div className="Info Teacher">
                        <div className="label">Teacher</div>
                        <div className="value">{props.lessons[2].teacher}</div>
                    </div>
                    <div className="Info Room">
                        <div className="label">Room</div>
                        <div className="value">{props.lessons[2].room}</div>
                    </div>
                </div>
*/}
            </div>
        </div>
    )
}

export default CertificateElement;