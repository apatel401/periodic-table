import React, { useContext, useRef } from 'react'
import Dropdown from './Dropdown'
import { classificationOptions, generateNumberArray, groupOptions, periodOptions } from "./utils/constant";
import { PeriodicTableContext } from './Provider'

const SelectionBtns = () => {
const context = useContext(PeriodicTableContext)
const periodRef = useRef(null);
const groupRef = useRef(null);
const classificationRef = useRef(null);

const handleChange = (e, label) => {
    const val = e.target.value;
    let elem;

    const resetOtherDropdowns = (excludeLabel) => {
        if (excludeLabel !== "Period" && periodRef.current) {
            periodRef.current.value = "";
        }
        if (excludeLabel !== "Group" && groupRef.current) {
            groupRef.current.value = "";
        }
        if (excludeLabel !== "Classification" && classificationRef.current) {
            classificationRef.current.value = "";
        }
    };

    const handlePeriod = (value) => generateNumberArray(value);

    const handleGroup = (value) => value.split(",");

    const handleClassification = (value) => {
        const elements = [];
        document.querySelectorAll(".element").forEach((el) => {
            if (el.classList.contains(value)) {
                elements.push(el.classList[0].split("-")[1]);
            }
            if (value.includes(",")) {
                value.split(",").forEach((v) => {
                    if (el.classList.contains(v)) {
                        elements.push(el.classList[0].split("-")[1]);
                    }
                });
            }
        });
        return elements;
    };

    resetOtherDropdowns(label)

    switch (label) {
        case "Period":
            elem = handlePeriod(val);
            break;
        case "Group":
            elem = handleGroup(val);
            break;
        case "Classification":
            elem = handleClassification(val);
            break;
        default:
            elem = [];
    }

    context.updateContext({
        activeElements: elem
    });
};


    return (
        <div className='selection-wrapper'>
            <Dropdown mainLabel={groupOptions.mainLabel} options={groupOptions.options} onChange={(e) => handleChange(e, groupOptions.mainLabel)} ref={groupRef}/>
            <Dropdown mainLabel={periodOptions.mainLabel} options={periodOptions.options} onChange={(e) => handleChange(e, periodOptions.mainLabel)} ref={periodRef} />
            <Dropdown mainLabel={classificationOptions.mainLabel} options={classificationOptions.options} onChange={(e) => handleChange(e, classificationOptions.mainLabel)} ref={classificationRef} />
        </div>
    )
}

export default SelectionBtns
