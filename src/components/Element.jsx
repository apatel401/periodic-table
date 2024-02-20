/* eslint-disable react/prop-types */
import {useState, useContext} from 'react'
import { elements } from './elements'
import { PeriodicTableContext } from './Provider';

const Element = ({num,setShowInfo, setCurrentElement}) => {
  const context = useContext(PeriodicTableContext)
  let element = elements[num];
  const [hover, setHover] = useState(false);

const onMouseEnter = () => {
    setHover(true);
    };
const onMouseLeave = () => {
    setHover(false);
    };
const openInfo = (e) => {
  e.preventDefault()
    setShowInfo(true);
    setCurrentElement(element);
    context.updateContext({
      currentElement: element,
      current: num,
      announcements: "displayDetails"
    })
    };


  return element && (
    <div
        title={element.name}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={openInfo}
        className={`element element-${num} ${element.category} ${
          hover ? "active" : ""
        }`}
        // tabIndex={0}
      >
        <div className="number">{element.number}</div>
        <div className="symbol">{element.symbol}</div>
        <div className="element-name">{element.name}</div>
      </div>
    )
}

export default Element