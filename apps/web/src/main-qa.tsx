/**
 * QA-only entry point for the UI primitives harness.
 *
 * Serves every shared component in one screen so appearance and behavior can be
 * checked in a browser. It is a separate HTML entry, and production builds
 * (`npm run build`) do not include it. Run with: `npm run dev:qa`.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App as QaApp } from './QaApp';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element "#root" was not found in the QA html entry.');
}

createRoot(container).render(
  <StrictMode>
    <QaApp />
  </StrictMode>,
);
