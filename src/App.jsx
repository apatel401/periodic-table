import React, { useEffect, useState } from 'react';
import PeriodicTable from './components/PeriodicTable';
import SelectionBtns from './components/SelectionBtns';
import './style.scss';
import ProviderComponent from './components/Provider';

const App = (props) => {
    const [config, setConfig] = useState({});

    useEffect(() => {
        async function getData() {
            let response = await fetch(props.config)
            const data = await response.json();
            setConfig(data)
        }
        getData();
    }, [])


    return Object.keys(config).length > 0 ? (
        <div className="periodic-table-container">
            <ProviderComponent config={config}>
                {config.settings.dropdown && <SelectionBtns />}
                <PeriodicTable />
            </ProviderComponent>
        </div>
    ) : null
}
export default App

