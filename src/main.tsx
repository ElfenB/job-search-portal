import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { authConfig } from "./authConfig";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Auth0Provider {...authConfig}>
      <App />
    </Auth0Provider>
  </StrictMode>,
);
