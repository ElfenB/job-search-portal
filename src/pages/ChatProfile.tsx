import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonRouterLink,
  IonContent,
} from "@ionic/react";
import { fallbackUserImage } from "../components/ChatList.consts";
import { useParams } from "react-router-dom";
import { User } from "@auth0/auth0-react";

export function ChatProfile() {
  const { id: recipientId } = useParams<{ id: string }>();

  // TODO: Fetch user from API
  const recipient: User = {
    id: recipientId,
    name: "Johnny Test",
    picture: undefined,
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>

          <IonTitle>{recipient.name}</IonTitle>

          <IonRouterLink slot="end" routerLink={`/chats/profile/${recipient.id}`}></IonRouterLink>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <img src={recipient.picture ?? fallbackUserImage} alt={recipient.name} />

        <h1>{recipient.name}</h1>
      </IonContent>
    </IonPage>
  );
}
