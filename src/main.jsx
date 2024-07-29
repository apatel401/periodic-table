import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Find all DOM containers
  let _tfc;

  document.querySelectorAll('.periodic-table-container')
  .forEach((domContainer, index) => {
    // Read the config from a data-* attribute.
    const _config = domContainer.dataset.config;
     _tfc = (_config !== undefined && _config !== '') ? (<React.StrictMode>
      <App id={index} config={_config} />
    </React.StrictMode>) : (<div className='warn'>error: missing config</div >);
    })

  ReactDOM.createRoot(
  document.getElementById("root")).render(
    _tfc,
  )
  
