import React, { useContext } from 'react'
import Dropdown from './Dropdown'
import { classificationOptions, generateNumberArray, groupOptions, periodOptions } from "./utils/constant";
import { PeriodicTableContext } from './Provider'

const SelectionBtns = () => {
const context = useContext(PeriodicTableContext)

    const handleChange = (e, label) => {
        const val = e.target.value;
        let elem;
        if (label == "Period") {
            elem = generateNumberArray(val);
            console.log(elem)
        }
        else if (label == "Group") {
            elem = val.split(",")
        } else if (label == "Classification") {
            elem = []
            document.querySelectorAll(".element").forEach((el) => {
                if (el.classList.contains(val)) {
                    elem.push(el.classList[0].split("-")[1])
                }
                if(val.includes(",")){
                    val.split(",").forEach((value) => {
                        if(el.classList.contains(value)){
                            elem.push(el.classList[0].split("-")[1])
                        }
                })
                }
            })
        }
        context.updateContext({
            activeElements: elem
        })
    }

    return (
        <>
            <Dropdown mainLabel={groupOptions.mainLabel} options={groupOptions.options} onChange={(e) => handleChange(e, groupOptions.mainLabel)} />
            <Dropdown mainLabel={periodOptions.mainLabel} options={periodOptions.options} onChange={(e) => handleChange(e, periodOptions.mainLabel)} />
            <Dropdown mainLabel={classificationOptions.mainLabel} options={classificationOptions.options} onChange={(e) => handleChange(e, classificationOptions.mainLabel)} />
        </>
    )
}

export default SelectionBtns
