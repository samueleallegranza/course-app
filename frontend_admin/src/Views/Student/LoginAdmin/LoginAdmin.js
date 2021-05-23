import React from 'react'
import './LoginAdmin.scss'

import { Link } from 'react-router-dom';


const Login = () => {
    return (
        <div className="LoginAdmin-Page">
            <div className="LoginContainer">
                <h1>Log in</h1>

                <div className="Selection">
                    <Link to="/login/student" className="Option left">
                        Student
                    </Link>
                    <Link className="Option right active">
                        Admin
                    </Link>
                </div>

                <input type="text" className="InputText" placeholder="Username">
                </input>

                <input type="password" className="InputText" placeholder="Password">
                </input>

                <Link className="Btn Btn-Full">
                    Continue -{'>'}
                </Link>

            </div>
        </div>
    )
}

export default Login