import React from 'react';
import ReactDOM from 'react-dom';
import { PeriodicTable } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Declare the injected version constant for TypeScript
declare const __APP_VERSION__: string;

// Export the version for programmatic access
export const version = __APP_VERSION__;

// Export the React component for React users
export { PeriodicTable };

/**
 * Standalone init function for non-React users.
 * This can be used as window.PeriodicTable.init('#div-id')
 */
export function init(selector: string, props: any = {}) {
  const container = document.querySelector(selector);
  if (!container) {
    console.error(`[PeriodicTable] Element not found for selector: ${selector}`);
    return;
  }

  const element = React.createElement(ErrorBoundary, null, 
    React.createElement(PeriodicTable, props)
  );

  // Check if we are in React 18+ environment
  // @ts-ignore
  const isReact18 = !!ReactDOM.createRoot;

  if (isReact18) {
    // For React 18+, we use createRoot
    // @ts-ignore
    const root = ReactDOM.createRoot(container);
    root.render(element);
    return {
      unmount: () => root.unmount(),
    };
  } else {
    // For React 17 and below, we use ReactDOM.render
    ReactDOM.render(element, container);
    return {
      unmount: () => ReactDOM.unmountComponentAtNode(container),
    };
  }
}
