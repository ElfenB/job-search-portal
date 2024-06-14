/* eslint-disable import/no-unused-modules */
import { StrictMode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import { AppApiWrapper } from './AppApiWrapper';

import { authConfig } from './authConfig';
import { ToastProvider } from './components/ToastBarContext';
// Load translations
import './i18n';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Auth0Provider {...authConfig}>
      <ToastProvider>
        <AppApiWrapper />
      </ToastProvider>
    </Auth0Provider>
  </StrictMode>,
);

// TODO: Add chat functionality (BE and FE) ==> Look for libraries
// TODO: Enable image upload for offers
// TODO: Double-check translations
// TODO: Add translation for India
// TODO: Lottie animations for launch screen
// TODO: Simple wireframe drawings for the app (with screen-recording)

// Weiterhin ist mir aufgefallen:
// •⁠ Job bearbeiten klappt nicht
// •⁠ man kann als Zahlen unendlich viele Nachkommastellen reinschreiben

// Bewertungssystem für User

// USER FEEDBACK:
// - Search bar for offers
// - Categories to search for offers
// - Star functionality for offers (cart, wishlist, etc.)
// - User profile with qualifications (like in LinkedIn)
// - One click offer-apply-process (send over CV, etc.)
