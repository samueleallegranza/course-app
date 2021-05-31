import React, {useState} from 'react'
import './StudentAuthLayout.scss'
import '../../Style/Student_Baseline.scss';

import { NavLink } from 'react-router-dom';
import AlertMessage from '../../Components/AlertMessage/AlertMessage';

const StudentAuthLayout = (props) => {
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
            <div className="NavBar">
                <div className="Logo">
                    <NavLink to={'/'}>
                        <span className="Left">Office</span>
                        <span className="Right">Talks</span>
                    </NavLink>
                </div>
            </div>
            {
                React.cloneElement(props.children, {alertTrigger})
            }
                        
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
    )
}

export default StudentAuthLayout