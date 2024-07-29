import React, { useContext, useRef } from 'react'
import { PeriodicTableContext } from './Provider';
import useDrawSpectrum from './utils/useDrawSpectram';
import AtomicBohrModel from './atomicBohrModel'
const ElementDetails = () => {
    const details = useRef();
    const context = useContext(PeriodicTableContext)
    const { currentElement } = useContext(PeriodicTableContext);
    useDrawSpectrum(currentElement);

    const closeInfo = () => {
        context.updateContext({
            announcements: "back",
            showInfo: false
        })
    };


    return (
        <div className="element-details" ref={details}>
            <div className="f-row">
                <h1>Name: {currentElement.name}</h1>
            </div>
            <div className="s-row">
                <div className="col-1">
                    <p>Average Atomic Mass (amu): {currentElement.averageAtomicMass}</p>
                    <p>Atomic Number: {currentElement.atomicNumber}</p>
                    <p>boilingPoint: {currentElement.boilingPoint}</p>
                    <p>Common Oxidation States: {currentElement.commonOxidationStates}</p>
                </div>
                <div className="col-2">
                    <p>melting point: {currentElement.meltingPoint}</p>
                    <p>electronegativity: {currentElement.electronegativity}</p>
                    <p>Phase at Standard Temperature and Pressure: {currentElement.phaseAtStandardTemperatureAndPressure}</p>
                </div>
            </div>
            <div id="spectra">

            </div>
            <div className="col-3">
                <p>Summary: {currentElement.summary}</p>
                <p>Atomic bohr Model: </p>
                <AtomicBohrModel />
            </div>
            <button onClick={closeInfo} className="back-btn"></button>
        </div>
    )
}

export default ElementDetails
