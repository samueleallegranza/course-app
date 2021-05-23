import React from 'react';
import './Select.scss';


const Select = (props) => {

    const handleOnChange = (event) => {
        const value = event.target.value;
        props.handleOnChange(value);
    }

    return (
        <select className="Select" onChange={handleOnChange}>
            {
                props.options.map ((elem, index) => {
                    return (<option value={index}>{elem}</option>);
                })
            }
        </select>
    );
}


export default Select;