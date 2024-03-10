import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonAvatar,
  IonRouterLink,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { chats } from "./ChatList.mockData";
import { useMemo } from "react";
import { fallbackUserImage } from "./ChatList.consts";

export function ChatConversation() {
  const { id: chatId } = useParams<{ id: string }>();

  const chat = useMemo(() => chats.find((chat) => chat.id === chatId), [chatId]);

  if (!chat) {
    return <div>Chat not found {chatId}</div>;
  }

  const { recipient, lastMessage } = chat;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>

          <IonTitle>{recipient.name}</IonTitle>

          <IonRouterLink slot="end" routerLink={`/chats/profile/${recipient.id}`}>
            <IonAvatar style={{ padding: "0.3rem" }}>
              <img src={recipient.picture ?? fallbackUserImage} alt={recipient.name} />
            </IonAvatar>
          </IonRouterLink>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen></IonContent>
    </IonPage>
  );
}
