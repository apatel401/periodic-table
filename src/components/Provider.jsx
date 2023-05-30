import React from 'react';
import { useState, createContext} from "react";
import Announcer from './Announcer';

export const PeriodicTableContext = createContext()
export const GlobalFun = createContext()

export default function ProviderComponent(props) {

    // const QUERY = '(prefers-reduced-motion: reduce)';
    // const mediaQueryList = window.matchMedia(QUERY);

    const contextInformation = {
        ...JSON.parse(JSON.stringify(props.config)),

        announcements: "",
        current: 0,
        
        
        updateContext: (contextUpdates) => {
            setContextInfo(currentContextInfo => ({ ...currentContextInfo, ...contextUpdates }));
        }
    }

    const [contextInfo, setContextInfo] = useState(contextInformation);


    return (
        <PeriodicTableContext.Provider value={contextInfo}>
                <Announcer message={contextInfo.announcements} />
                {props.children}
        </PeriodicTableContext.Provider>
    )
}