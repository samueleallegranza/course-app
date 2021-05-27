import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuthStudent() {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

    componentDidMount() {
        fetch('/checkToken')
        .then(res => {
            if (res.status === 200) {
                this.setState({ loading: false });
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            this.setState({ loading: false, redirect: true });
        });
    }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login/student" />;
            }
            return {...this.props.children};
        }
    }
}
