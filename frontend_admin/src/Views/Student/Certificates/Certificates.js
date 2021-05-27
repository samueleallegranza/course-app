import React, {useState, useEffect} from 'react';
import './Certificates.scss';

import Cookies from 'universal-cookie';

import CertificateElement from './CertificateElement'

// Retrieve the list of events that the user was subscribed to
async function getSubscriptions(username) {
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


const Certificates = (props) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(loading) {
            const cookies = new Cookies()
            const username = cookies.get('username')
            getSubscriptions(username).then(subs => {
                setSubscriptions(subs)
                setLoading(false);
            });
        }
    }, [loading])

    return (
        <div className="StudentContent Certificates-Page">
            <div className="Heading">
                <h1>Certificates</h1>
            </div>
            <div className="CertList">
            {
                loading ? null :
                subscriptions.map(sub => {
                    // date formatting
                    const date = new Date(sub.day)
                    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
                    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
                    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
                    const nth = nthDaySuffix(da);
                    const formattedDate = `${mo} ${da}${nth}, ${ye}`;

                    return (
                        <CertificateElement
                            idevent={sub.idevent}
                            name={sub.name}
                            date={formattedDate}
                            difficulty={sub.difficulty}
                            idtemplate={sub.idtemplate}

                            alertTrigger={sub.alertTrigger}
                        />
                    )
                })
            }
                {/* <CertificateElement
                    idevent={1}
                    name={"Office at work 101"}
                    date={"May 27th, 2021"}
                    difficulty={"Medium"}
                    idtemplate={1}
                    lessons={[
                        { name: "Introduction to Excel", teacher: "Elon Musk", room: "A1", presence: "Partial" },
                        { name: "Introduction to Word", teacher: "Albus Silente", room: "B1", presence: "Partial" },
                        { name: "Introduction to PowerPoint", teacher: "Albus Silente", room: "A2", presence: "Complete" },
                        { name: "Introduction to Outlook", teacher: "Elon Musk", room: "A1", presence: "Complete" },
                    ]}

                    alertTrigger={props.alertTrigger}
                />

                <CertificateElement
                    idevent={1}
                    name={"Office at work 101"}
                    date={"May 27th, 2021"}
                    difficulty={"Medium"}
                    idtemplate={1}
                    lessons={[
                        { name: "Introduction to Excel", teacher: "Elon Musk", room: "A1", presence: "Partial" },
                        { name: "Introduction to Word", teacher: "Albus Silente", room: "B1", presence: "Partial" },
                        { name: "Introduction to PowerPoint", teacher: "Albus Silente", room: "A2", presence: "Complete" },
                        { name: "Introduction to Outlook", teacher: "Elon Musk", room: "A1", presence: "Complete" },
                    ]}

                    alertTrigger={props.alertTrigger}
                />

                <CertificateElement
                    idevent={1}
                    name={"Office at work 101"}
                    date={"May 27th, 2021"}
                    difficulty={"Medium"}
                    idtemplate={1}
                    lessons={[
                        { name: "Introduction to Excel", teacher: "Elon Musk", room: "A1", presence: "Partial" },
                        { name: "Introduction to Word", teacher: "Albus Silente", room: "B1", presence: "Partial" },
                        { name: "Introduction to PowerPoint", teacher: "Albus Silente", room: "A2", presence: "Complete" },
                        { name: "Introduction to Outlook", teacher: "Elon Musk", room: "A1", presence: "Complete" },
                    ]}

                    alertTrigger={props.alertTrigger}
                /> */}

            </div>
        </div>
    )
}

export default Certificates