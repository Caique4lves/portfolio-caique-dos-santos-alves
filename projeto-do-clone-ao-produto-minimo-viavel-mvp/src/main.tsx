import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './components/auth/AuthProvider.tsx';
import { AccessibilityProvider } from './components/accessibility/AccessibilityProvider.tsx';
import { AccessibilityMenu } from './components/accessibility/AccessibilityMenu.tsx';
import { AccessibilityFilters } from './components/accessibility/AccessibilityFilters.tsx';
import { HelpBot } from './components/help/HelpBot.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <AccessibilityProvider>
          <App />
          <AccessibilityMenu />
          <AccessibilityFilters />
          <HelpBot />
        </AccessibilityProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
