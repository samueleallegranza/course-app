import React from 'react';
import './InputText.scss';

const InputText = (props) => {
    return (
        <input 
            className="ADM-InputText"
            type="text" 
            placeholder={props.placeholder}>
        </input>
    )
}

export default InputText