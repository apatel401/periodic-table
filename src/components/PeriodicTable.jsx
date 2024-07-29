/* eslint-disable react/no-unknown-property */
import {  useRef, useContext, useEffect } from "react";
import Element from "./Element";
import { PeriodicTableContext } from "./Provider";
import ElementDetails from "./ElementDetails";

const PeriodicTable = () => {
  const context = useContext(PeriodicTableContext)
  const elemRefs = useRef([]);

  useEffect(() => {
    if (context.announcements === "back") {
      elemRefs.current[context.current].focus();
    }
  }, [context.showInfo]);

  const showElement = (start, end) => {
    let items = [];
    for (let i = start; i <= end; i++) {
      items.push(
        <Element
          num={i}
          key={i}
          ref={(el) => (elemRefs.current[i] = el)}
        />
      );
    }
    return items;
  };


  return context.showInfo ? <ElementDetails /> : (
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
)
};

export default PeriodicTable;
