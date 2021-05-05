import React from 'react';
import './ButtonIcon.scss';

const ButtonIcon = (props) => {
    return (
        <button className="ButtonIcon">
            {props.children}
        </button>
    )
}

export default ButtonIcon;