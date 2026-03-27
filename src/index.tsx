import React from 'react';
import * as ReactDOM from 'react-dom';
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

  const element = (
    <ErrorBoundary>
      <PeriodicTable {...props} />
    </ErrorBoundary>
  );

  // Robust check for React 18+ in both bundled and external environments
  // @ts-ignore
  const reactDOM = (ReactDOM.default || ReactDOM) as any;
  
  // If we are in a slim build, ReactDOM might be on the window
  const globalReactDOM = typeof window !== 'undefined' ? (window as any).ReactDOM : null;
  const finalReactDOM = reactDOM || globalReactDOM;

  if (!finalReactDOM) {
    console.error('[PeriodicTable] ReactDOM not found. Please ensure React and ReactDOM are loaded.');
    return;
  }

  const isReact18 = typeof finalReactDOM.createRoot === 'function';

  if (isReact18) {
    const root = finalReactDOM.createRoot(container);
    root.render(element);
    return {
      unmount: () => root.unmount(),
    };
  } else {
    finalReactDOM.render(element, container);
    return {
      unmount: () => finalReactDOM.unmountComponentAtNode(container),
    };
  }
}
