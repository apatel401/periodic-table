/* eslint-disable react/no-unknown-property */
import { useState, useRef, useContext, useEffect } from "react";
import Element from "./Element";
import BohrModel from "./atomicBohrModel/BohrModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PeriodicTableContext } from "./Provider";
import SelectionBtns from "./SelectionBtns";
import useDrawSpectrum from "./utils/useDrawSpectram";

const PeriodicTable = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [currentElement, setCurrentElement] = useState();
  const context = useContext(PeriodicTableContext)
  const details = useRef();
  const elemRefs = useRef([]);
  useDrawSpectrum(currentElement);

  useEffect(() => {
    if (context.announcements === "back") {
      elemRefs.current[context.current].focus();
    }
  }, [showInfo]);

  const showElement = (start, end) => {
    let items = [];
    for (let i = start; i <= end; i++) {
      items.push(
        <Element
          setShowInfo={setShowInfo}
          setCurrentElement={setCurrentElement}
          num={i}
          key={i}
          ref={(el) => (elemRefs.current[i] = el)}
        />
      );
    }
    return items;
  };

  const closeInfo = () => {
    setShowInfo(false);
    context.updateContext({
      announcements: "back"
    })
  };

  return !showInfo ? (
    <>
      <div className="periodic-table-wrapper">
        {/* Need to use useElement to split the elements 
      into different parts to achieve real periodic table shape */}
        {showElement(1, 4)}
        <div className="description">
          <p>{context.activeDescription}</p>
        </div>
        {showElement(5, 57)}
        {/* Lanthanoids split 72-89 */}
        {showElement(72, 89)}
        {/* Actinoids split 104-118*/}
        {showElement(104, 118)}
        {/* Lanthenoids 58-71*/}
        {showElement(58, 71)}
        {/* Actionoids 90-103 */}
        {showElement(90, 103)}
      </div>
    </>
  ) : (
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
        <Canvas camera={{ position: [30, 5, 5] }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <BohrModel
            atoms={currentElement.number}
            shells={currentElement.shells}
          />
          <OrbitControls />
        </Canvas>
      </div>
      <button onClick={closeInfo} className="back-btn"></button>
    </div>
  );
};

export default PeriodicTable;
