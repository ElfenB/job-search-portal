import { Redirect, Route } from "react-router-dom";
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
import { chatbox, person, home } from "ionicons/icons";
import { Overview } from "./pages/Overview";
import { Chats } from "./pages/Chats";
import { Personal } from "./pages/Personal";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const isLoggedIn = true;

export function App() {
  return (
    <IonApp>
      <IonReactRouter>
        {!isLoggedIn && (
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

        {isLoggedIn && (
          <IonTabs>
            <IonRouterOutlet>
              {/* Tabs */}
              <Route exact path="/overview">
                <Overview />
              </Route>
              <Route exact path="/chats">
                <Chats />
              </Route>
              <Route path="/personal">
                <Personal />
              </Route>

              {/* Other routes (e.g. settings) */}
              <Route exact path="/settings">
                <Settings />
              </Route>

              {/* Redirect to home page (this is also the fallback route) */}
              <Route>
                <Redirect to="/overview" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="overview" href="/overview">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Overview</IonLabel>
              </IonTabButton>
              <IonTabButton tab="chats" href="/chats">
                <IonIcon aria-hidden="true" icon={chatbox} />
                <IonLabel>Chats</IonLabel>
              </IonTabButton>
              <IonTabButton tab="personal" href="/personal">
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
