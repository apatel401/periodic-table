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
                <h1>Element Name: {currentElement.name}</h1>
            </div>
            <div className="s-row">
                <div className="col-1">
                    <p>Appearance: {currentElement.appearance}</p>
                    <p>Atomic_mass: {currentElement.atomic_mass}</p>
                    <p>Boil: {currentElement.boil}</p>
                    <p>Density: {currentElement.density}</p>
                </div>
                <div className="col-2">
                    <p>Melt: {currentElement.melt}</p>
                    <p>Molar_heat: {currentElement.molar_heat}</p>
                    <p>Number: {currentElement.number}</p>
                    <p>Phase: {currentElement.phase}</p>
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
