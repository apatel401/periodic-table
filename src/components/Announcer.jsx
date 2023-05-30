
import React, { useContext } from 'react';
import { PeriodicTableContext } from './Provider';

const Announcer = React.memo((props) => {
    // With react memo, react memorizes the the result
    // Meaning that if the new props are the same then it will skip the next rendering
    // If the contents of the props changes, then react will re-render

    let messageContent = props.message;


    const message = () => {
        switch(messageContent) {
            case 'test':
                return `Card flipped.`;
            default:
                return '';
        }
    }

    // aria-live region for announcements
    return (
        <div role="alert" aria-live="polite" aria-atomic="true" className="sr-only">
            { message() }
        </div>
    );
})
export default Announcer;