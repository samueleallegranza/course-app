import React from 'react';
import './ButtonTextIcon.scss';

const ButtonTextIcon = (props) => {
    return (
        <button className="ButtonTextIcon">
            {props.children}
            <span>{props.text}</span>
        </button>
    );
}

export default ButtonTextIcon;