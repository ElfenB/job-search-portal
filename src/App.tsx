import { useAuth0 } from "@auth0/auth0-react";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { chatbox, home, person } from "ionicons/icons";
import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { ChatConversation } from "./components/ChatConversation";
import { ChatProfile } from "./pages/ChatProfile";
import { Chats } from "./pages/Chats";
import { LoadingScreen } from "./pages/LoadingScreen";
import { Login } from "./pages/Login";
import { OfferDetails } from "./pages/OfferDetails";
import { Overview } from "./pages/Overview";

import { Personal } from "./pages/Personal";
import { Settings } from "./pages/Settings";

/* Theme variables */
import "./theme/variables.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";

setupIonicReact();

const isEnvDefined = import.meta.env.VITE_AUTH0_CLIENT_ID_WEB && import.meta.env.VITE_AUTH0_DOMAIN;

export function App() {
  // Get the callback handler from the Auth0 React hook
  const { handleRedirectCallback, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    void CapApp.addListener("appUrlOpen", async ({ url }) => {
      if (url.includes("state") && (url.includes("code") || url.includes("error"))) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  }, [handleRedirectCallback]);

  if (!isEnvDefined) {
    return (
      <h1 style={{ color: "red", fontFamily: "sans-serif", textAlign: "center" }}>
        Error: Please check environment variables.
      </h1>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        {!isAuthenticated && (
          <>
            <Route exact path="/login">
              <Login />
            </Route>

            {/* Redirect everything to login */}
            <Route>
              <Redirect to="/login" />
            </Route>
          </>
        )}

        {isAuthenticated && (
          <IonTabs>
            <IonRouterOutlet>
              {/* Tabs */}
              <Route exact path="/overview">
                <Overview />
              </Route>
              <Route exact path="/overview/:id">
                <OfferDetails />
              </Route>

              <Route exact path="/chats">
                <Chats />
              </Route>
              <Route path="/chats/:id">
                <ChatConversation />
              </Route>
              <Route path="/chats/profile/:id">
                <ChatProfile />
              </Route>

              <Route exact path="/personal">
                <Personal />
              </Route>
              <Route path="/personal/:id">
                <OfferDetails />
              </Route>

              <Route exact path="/personal/settings">
                <Settings />
              </Route>

              {/* Redirect to home page */}
              <Route exact path="/">
                <Redirect to="/overview" />
              </Route>

              {/* Redirect when authenticated */}
              <Route exact path="/login">
                <Redirect to="/overview" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton href="/overview" tab="overview">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Overview</IonLabel>
              </IonTabButton>

              <IonTabButton href="/chats" tab="chats">
                <IonIcon aria-hidden="true" icon={chatbox} />
                <IonLabel>Chats</IonLabel>
              </IonTabButton>

              <IonTabButton href="/personal" tab="personal">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Personal</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
}
