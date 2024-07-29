/* eslint-disable react/prop-types */
import { useState, useContext, useEffect, forwardRef} from 'react'
import { PeriodicTableConfig, PeriodicTableContext } from './Provider';

const Element = forwardRef(({num}, ref) => {

  const context = useContext(PeriodicTableContext)
  const config = useContext(PeriodicTableConfig)
  let element = config[num];
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
    context.updateContext({
      currentElement: element,
      current: num,
      announcements: "displayDetails",
      showInfo: true
    })
  };


  const isActive = context.activeElements?.includes(num.toString());
  const classes = [
    `element-${num}`,
    'element',
    element.category,
    hover ? 'active' : '',
    !isActive && context.activeElements !== null && !context.clearSelection ? 'disabled' : '',
    isActive ? "group-active" : ''
  ].filter(Boolean).join(' ');

  return element && (
    <div
      title={element.name}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          openInfo(e);
        }
      }}
      ref={ref}
      onClick={openInfo}
      className={classes}
      aria-label={element.name + "-" + element.number}
      tabIndex={isActive || context.activeElements === null ? "0" : "-1"}
    >
      <div className="number">{element.number}</div>
      <div className="symbol">{element.symbol}</div>
      {/* <div className="element-name">{element.name}</div> */}
    </div>
  )
})

 export default Element