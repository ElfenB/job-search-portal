/* eslint-disable import/no-unused-modules */
import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { authConfig } from "./authConfig";

// Load translations
import "./i18n";

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Auth0Provider {...authConfig}>
      <App />
    </Auth0Provider>
  </StrictMode>,
);
