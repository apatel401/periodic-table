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
        current: null,
        activeElements: null,
        activeDescription: "To navigate in the periodic table press the buttons to explore each section and press the elements to see detailed information.",
        clearSelection: false,
        
        
        updateContext: (contextUpdates) => {
            setContextInfo(currentContextInfo => ({ ...currentContextInfo, ...contextUpdates }));
        }
    }

    const [contextInfo, setContextInfo] = useState(contextInformation);


    return (
        <PeriodicTableContext.Provider value={contextInfo}>
                <Announcer message={contextInfo.announcements} currentElement={contextInfo.currentElement} desc={contextInfo.activeDescription} />
                {props.children}
        </PeriodicTableContext.Provider>
    )
}