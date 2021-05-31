import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const WithAuth = (props) => {

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (loading) {
            fetch('/checkToken')
                .then(res => {
                    if (res.status === 200) {
                        setLoading(false);
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                    setRedirect(true);
                });
        }
    }, [loading])

    if (loading) { return null }
    if (redirect) { return <Redirect to="/login/admin" /> }
    return (<div>{props.children}</div>)
}

export default WithAuth;