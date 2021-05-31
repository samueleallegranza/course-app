import React from 'react';
import './Signup.scss';

import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className="Signup-Page">
            <h1>Sign up</h1>

            <Link className="Btn Btn-Outline">
                <img className="Avatar" src={require('../../../Media/google.svg').default} />
                Sign up with Google
            </Link>

            <div className="Divider">OR</div>

            <input type="text" className="InputText" placeholder="Full Name" />
            <input type="text" className="InputText" placeholder="Birth" 
                onFocus={(e) => e.currentTarget.type="date"}
                onBlur={(e) => {e.currentTarget.type = "text"; e.currentTarget.placeholder = "Birth";}}
            />
            <input type="text" className="InputText" placeholder="Email" />
            <input type="text" className="InputText" placeholder="Username" />
            <input type="password" className="InputText" placeholder="Password" />
            <input type="password" className="InputText" placeholder="Repeat Password" />

            <Link className="Btn Btn-Full">
                Continue -{'>'}
            </Link>

        </div>
    )
}

export default Signup;