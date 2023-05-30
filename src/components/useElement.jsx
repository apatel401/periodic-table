import Element from "./Element"
import React,{ useState } from 'react';

export const useElement = (start, end) => {
    const [showInfo, setShowInfo] = useState(false);
    const [currentElement, setCurrentElement] = useState({});
        let items = []
        for (let i = start; i <= end; i++) {
          items.push(<Element setShowInfo={setShowInfo} setCurrentElement={setCurrentElement} num={i} />)
        }
        return items
}