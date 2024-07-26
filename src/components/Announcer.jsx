/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
const Announcer = React.memo((props) => {
    // With react memo, react memorizes the the result
    // Meaning that if the new props are the same then it will skip the next rendering
    // If the contents of the props changes, then react will re-render

    let messageContent = props.message;
    let currentElement = props.currentElement;
    let desc = props.desc;

    const message = () => {
        switch (messageContent) {
            case 'displayDetails':
                return currentElement && `Element Name: ${currentElement.name}, 
                Number: ${currentElement.number},`
            case 'dropdown':
                return desc
            case 'back':
                return `back to periodic table showing all elements`;

            default:
                return '';
        }
    }

    // aria-live region for announcements
    return (
        <div role="alert" aria-live="polite" aria-atomic="true" className="sr-only">
            {message()}
        </div>
    );
})
export default Announcer;