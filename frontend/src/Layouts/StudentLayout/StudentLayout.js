import React, { useState } from 'react'
import './StudentLayout.scss';
import '../../Style/Student_Baseline.scss';

import NavBar from './NavBar';
import Footer from './Footer';

import AlertMessage from '../../Components/AlertMessage/AlertMessage';

const StudentLayout = (props) => {
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")
    const [alertSeverity, setAlertSeverity] = useState(null)

    const alertTrigger = (message, severity) => {
        setAlertMsg(message);
        setAlertSeverity(severity);
        setAlertOpen(true)
    }

    return (
        <div>
            <NavBar />
            {
                React.cloneElement(props.children, { alertTrigger })
            }
            <Footer />

            <AlertMessage
                open={alertOpen}
                message={alertMsg}
                severity={alertSeverity}
                setClose={() => {
                    console.log("Alert close") // WTFF ?! It needs it in order to work
                    setAlertOpen(false)
                }}
            />
        </div>
    );
}

export default StudentLayout;