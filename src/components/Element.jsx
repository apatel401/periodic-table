/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react'
import { elements } from './elements'
import { PeriodicTableContext } from './Provider';

const Element = ({ num, setShowInfo, setCurrentElement }) => {
  const context = useContext(PeriodicTableContext)
  let element = elements[num];
  const [hover, setHover] = useState(false);

  useEffect(() => {
    document.querySelectorAll(".disabled").forEach((btn) => {
      btn.setAttribute("tabindex", "-1")
    })
  }, [context.activeElements])

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


  const isActive = context.activeElements?.includes(num.toString());
  const classes = [
    `element-${num}`,
    'element',
    element.category,
    hover ? 'active' : '',
    !isActive && context.activeElements !== null ? 'disabled' : '',
    isActive ? "group-active" : ''
  ].filter(Boolean).join(' ');

  return element && (
    <div
      title={element.name}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={openInfo}
      className={classes}
      tabIndex={isActive || context.activeElements === null ? "0" : "-1"}
    >
      <div className="number">{element.number}</div>
      <div className="symbol">{element.symbol}</div>
      <div className="element-name">{element.name}</div>
    </div>
  )
}

 export default Element