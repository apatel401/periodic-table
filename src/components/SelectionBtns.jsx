import React, { useContext, useRef } from 'react'
import Dropdown from './Dropdown'
import { classificationOptions, generateNumberArray, groupOptions, periodOptions } from "./utils/constant";
import { PeriodicTableContext } from './Provider'

const SelectionBtns = () => {
    const context = useContext(PeriodicTableContext)
    const periodRef = useRef(null);
    const groupRef = useRef(null);
    const classificationRef = useRef(null);
    let initialDesc = 'To navigate in the periodic table press the buttons to explore each section and press the elements to see detailed information.'

    const handleChange = (e, label) => {
        const val = e.target.value;
        let elem;
        let desc;
        let selectedObj;
        let clearSelection = false;
        //setting clear selection to remove disabled class
        if (val === "") {
            clearSelection = true;
        };
        //clearing selection of other dropdown when one is clicked

        if (label !== "Period" && periodRef.current) {
            periodRef.current.value = "";
        }
        if (label !== "Group" && groupRef.current) {
            groupRef.current.value = "";
        }
        if (label !== "Classification" && classificationRef.current) {
            classificationRef.current.value = "";
        }

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

        switch (label) {
            case "Period":
                elem = handlePeriod(val);
                selectedObj = periodOptions.options.find(option => option.value === val);
                desc = selectedObj ? selectedObj.description : initialDesc
                break;
            case "Group":
                elem = handleGroup(val);
                selectedObj = groupOptions.options.find(option => option.value === val);
                desc = selectedObj ? selectedObj.description : initialDesc
                break;
            case "Classification":
                elem = handleClassification(val);
                selectedObj = classificationOptions.options.find(option => option.value === val);
                desc = selectedObj ? selectedObj.description : initialDesc
                break;
            default:
                elem = [];
        }

        context.updateContext({
            activeElements: elem,
            activeDescription: desc,
            announcements: "dropdown",
            clearSelection: clearSelection
        });
    };

    const handleClear = () => {

        context.updateContext({ 
            clearSelection: true,
            activeElements: null,
            activeDescription: initialDesc,
         });
        //Making sure all values for dropdown is cleared
        periodRef.current.value = "";
        groupRef.current.value = "";
        classificationRef.current.value = "";
    }

    return (
        <div className='selection-wrapper'>
            <Dropdown mainLabel={groupOptions.mainLabel} options={groupOptions.options} onChange={(e) => handleChange(e, groupOptions.mainLabel)} ref={groupRef} />
            <Dropdown mainLabel={periodOptions.mainLabel} options={periodOptions.options} onChange={(e) => handleChange(e, periodOptions.mainLabel)} ref={periodRef} />
            <Dropdown mainLabel={classificationOptions.mainLabel} options={classificationOptions.options} onChange={(e) => handleChange(e, classificationOptions.mainLabel)} ref={classificationRef} />
            <button onClick={handleClear} aria-label="Clear selection">Clear Selection</button>
        </div>
    )
}

export default SelectionBtns
