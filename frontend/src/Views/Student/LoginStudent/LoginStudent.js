import React, {useState} from 'react'
import './LoginStudent.scss'
import md5 from 'md5'
import Cookies from 'universal-cookie';

import { Link, useHistory } from 'react-router-dom';

const fetchAuth = (credentials) => {
    credentials.password = md5(credentials.password)    //MD5 over password
    return fetch("/students/auth", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const Login = (props) => {
    
    const history = useHistory();

    const [credentials, setCredentials] = useState({username: '', password: ''})
    
    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setCredentials((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (e) => {
        fetchAuth({...credentials}).then(res => {
            if(res.status == 200) {
                const cookies = new Cookies();
                cookies.set('username', credentials.username, { path: '/' });
                cookies.set('role', "student", { path: '/' });
                history.push('/');
            } else {
                props.alertTrigger("Authentication failed", "error");
            }
        })
    }

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

                {/* <Link className="Btn Btn-Outline">
                    <img className="Avatar" src={require('../../../Media/google.svg').default} />
                    Log in with Google
                </Link>

                <div className="Divider">
                    OR
                </div> */}

                <input 
                    type="text" 
                    className="InputText" 
                    placeholder="Username"
                    name="username"
                    onChange={handleInputChange}
                />
                <input 
                    type="password" 
                    className="InputText" 
                    placeholder="Password" 
                    name="password"
                    onChange={handleInputChange}
                />

                <Link className="Btn Btn-Full" onClick={handleSubmit}>
                    Continue -{'>'}
                </Link>

                <div className="FooterMsg">
                </div>
            </div>
        </div>
    )
}

export default Login