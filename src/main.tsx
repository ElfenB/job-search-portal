/* eslint-disable import/no-unused-modules */
import { StrictMode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";
import { AppApiWrapper } from "./AppApiWrapper";

import { authConfig } from "./authConfig";
import { ToastProvider } from "./components/ToastBarContext";
// Load translations
import "./i18n";

const container = document.getElementById("root");
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
