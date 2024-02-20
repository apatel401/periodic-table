/* eslint-disable react/prop-types */
import { useState, createContext} from "react";
import Announcer from './Announcer';

export const PeriodicTableContext = createContext()

export default function ProviderComponent(props) {

    // const QUERY = '(prefers-reduced-motion: reduce)';
    // const mediaQueryList = window.matchMedia(QUERY);

    const contextInformation = {
        ...JSON.parse(JSON.stringify(props.config)),

        announcements: "",
        currentElement: null,
        
        
        updateContext: (contextUpdates) => {
            setContextInfo(currentContextInfo => ({ ...currentContextInfo, ...contextUpdates }));
        }
    }

    const [contextInfo, setContextInfo] = useState(contextInformation);


    return (
        <PeriodicTableContext.Provider value={contextInfo}>
                <Announcer message={contextInfo.announcements} currentElement={contextInfo.currentElement}  />
                {props.children}
        </PeriodicTableContext.Provider>
    )
}