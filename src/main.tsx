import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { PeriodicTable } from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PeriodicTable />
    </ErrorBoundary>
  </StrictMode>,
);
