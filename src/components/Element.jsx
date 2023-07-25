/* eslint-disable react/prop-types */
import {useState} from 'react'
import { elements } from './elements'

const Element = ({num,setShowInfo, setCurrentElement}) => {
let element = elements[num];
const [hover, setHover] = useState(false);

const onMouseEnter = () => {
    setHover(true);
    };
const onMouseLeave = () => {
    setHover(false);
    };
const openInfo = () => {
    setShowInfo(true);
    setCurrentElement(element);
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