import React from 'react';
import './Avatar.scss';

const Avatar = () => {
    return (
        <img className="Avatar" src={require('../../Media/avatar.png').default} alt="avatar" />
    );
}

export default Avatar;