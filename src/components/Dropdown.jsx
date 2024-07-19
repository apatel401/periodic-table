import React, { useState } from 'react';

const Dropdown = ({ options, mainLabel, value, onChange }) => {

    return (
        <div className='form-selection'>
            <label>{mainLabel}</label>
            <select  className='form-select' name={options.mainLabel} value={value} onChange={onChange}>
                <option value="">Select {mainLabel}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
