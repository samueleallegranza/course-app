import React from 'react'
import './LoginStudent.scss'

import { Link } from 'react-router-dom';


const Login = () => {
    return (
        <div className="LoginStudent-Page">
            <div className="LoginContainer">
                <h1>Log in</h1>

                <div className="Selection">
                    <Link className="Option left active">
                        Student
                    </Link>
                    <Link to="/login/admin" className="Option right">
                        Admin
                    </Link>
                </div>

                <Link className="Btn Btn-Outline">
                    <img className="Avatar" src={require('../../../Media/google.svg').default} />
                    Log in with Google
                </Link>

                <div className="Divider">
                    OR
                </div>

                <input type="text" className="InputText" placeholder="Username">
                </input>

                <input type="password" className="InputText" placeholder="Password">
                </input>

                <Link className="Btn Btn-Full">
                    Continue -{'>'}
                </Link>

                <div className="FooterMsg">
                </div>
            </div>
        </div>
    )
}

export default Login