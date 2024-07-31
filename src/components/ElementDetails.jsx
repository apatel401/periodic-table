import React, { useContext, useRef } from 'react'
import { PeriodicTableConfig, PeriodicTableContext } from './Provider';
import useDrawSpectrum from './utils/useDrawSpectram';
import AtomicBohrModel from './atomicBohrModel'
import { generateNumberArray, groupOptions, periodOptions } from './utils/constant';
const ElementDetails = () => {
    const context = useContext(PeriodicTableContext)
    const config = useContext(PeriodicTableConfig)
    const { currentElement } = useContext(PeriodicTableContext);
    config.settings.spectra && useDrawSpectrum(currentElement);

    const closeInfo = () => {
        context.updateContext({
            announcements: "back",
            showInfo: false
        })
    };
    const periodLabel = () => {
        for (const option of periodOptions.options) {
            const values = generateNumberArray(option.value).map(Number)
            if (values.includes(currentElement.number)) {
                return option.label;
            }
        }
        return null;
    };

    const groupLabel = () => {
        for (const option of groupOptions.options) {
            const values = option.value.split(',').map(Number);
            if (values.includes(currentElement.number)) {
                return option.label;
            }
        }
        return null;
    };

    return (
        <div className="element-details">
            <div className="element-content">
                <button className="element-close-button" onClick={closeInfo}>
                    &times;
                </button>
                <div className="f-row">
                    <h2>Name: {currentElement.name}</h2>
                </div>
                <div className="s-row">
                    <div className='col-0'>
                        <div className={'col-3 ' + context.currentElement.category}>
                            <div className='row-1'>
                                <p style={{ fontSize: "1.5rem" }}>{currentElement.atomicNumber}</p>
                                <p style={{ fontSize: "1rem", wordBreak: "break-word", wordWrap: "break-word", textAlign: "right" }}>{currentElement.averageAtomicMass}</p>
                            </div>
                            <div className='row-2'>
                                <p>{currentElement.symbol}</p>
                            </div>
                            <div className='row-3'>
                                <p>{currentElement.name}</p>
                            </div>
                            <div className='row-4'>
                                <p>{currentElement.category}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1">
                        <p>Average Atomic Mass (amu): {currentElement.averageAtomicMass}</p>
                        <p>Atomic Number: {currentElement.atomicNumber}</p>
                        <p>boilingPoint: {currentElement.boilingPoint}</p>
                        <p>Common Oxidation States: {currentElement.commonOxidationStates}</p>
                        <p>melting point: {currentElement.meltingPoint}</p>
                        <p>electronegativity: {currentElement.electronegativity}</p>
                        <p>Phase at Standard Temperature and Pressure: {currentElement.phaseAtStandardTemperatureAndPressure}</p>
                        <div style={{    display: "flex",    justifyContent: "space-around", textAlign: "center"}}>
                        <p>Group <span>{groupLabel()}</span></p>
                        <p>Period <span>{periodLabel()}</span></p>
                        </div>
                    </div>
                </div>
                {config.settings.spectra && <div id="spectra"></div>}

                {config.settings.bohrModel && (<div className="col-3">
                    <p>Atomic bohr Model: </p>
                    <AtomicBohrModel />
                </div>)}
            </div>
        </div>
    )
}

export default ElementDetails
