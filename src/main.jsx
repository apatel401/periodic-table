import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ProviderComponent from './components/Provider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProviderComponent config={null}>
    <App  />
    </ProviderComponent>
  </React.StrictMode>,
)
