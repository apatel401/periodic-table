import React from 'react';
import { createRoot } from 'react-dom/client';
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

  const root = createRoot(container);
  root.render(element);
  
  return {
    unmount: () => root.unmount(),
  };
}
