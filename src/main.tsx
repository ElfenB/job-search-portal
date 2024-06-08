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

// Feedback:
// "Bugs"/ToDos:
// 1. Ich kann zb dein Gesuch löschen ✅
// 2. ich sehe bei mir kein richtiges Profilbild, vielleicht kann man da einen nicht personalisierten Standard einfügen? ✅
// 3. siehst du mein Gesuch in der Overview? Ich nämlich nicht ✅

// Weiterhin ist mir aufgefallen:
// •⁠ Job bearbeiten klappt nicht
// •⁠ man kann als Zahlen unendlich viele Nachkommastellen reinschreiben
// •⁠ Leider kann man nicht auf die Profile von den anderen klicken
// •⁠ den Ort kann man nicht mit angeben (?) ✅

// Preis auf Cards anzeigen (für mehr Farbe)
