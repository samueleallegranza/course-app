import React from 'react';
import './ButtonIcon.scss';

const ButtonIcon = (props) => {
    return (
        <div>
            <button className="ButtonIcon">
                {props.children}
            </button>
        </div>
    )
}

export default ButtonIcon;