import {useElement} from './useElement'

const PeriodicTable = () => {
  return (
    <div className="periodic-table-wrapper">
      {/* Need to use useElement to split the elements 
      into different parts to achieve real periodic table shape */}
      {useElement(1,4)}
      <div className='big-symbol'>
        {/* symbol Big */}
        </div>
      <div className='details'>
        {/* Will display info here */}
        </div>
      {useElement(5, 57)}
          {useElement(72, 89)}
          {useElement(104, 118)}
          {/* Lanthanoids split 72-89 */}
          {useElement(58, 71)}
          {useElement(90, 103)}
          {/* Actinoids split 104-119*/}
          {/* Lanthenoids 58-71*/}
          {/* Actionoids 90-103 */}
      </div>
  )
}

export default PeriodicTable