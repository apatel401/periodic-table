import React, { forwardRef } from 'react';

const Dropdown = forwardRef(({ options, mainLabel, value, onChange }, ref) => {

    return (
        <div className='form-selection'>
            <label>{mainLabel}</label>
            <select  className='form-select' name={options.mainLabel} value={value} onChange={onChange} ref={ref}>
                <option value="">Select {mainLabel}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
})

export default Dropdown;
