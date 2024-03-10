import {
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../pages/Error404";
import { BackButton } from "./BackButton";
import { fallbackUserImage } from "./ChatList.consts";
import { chats } from "./ChatList.mockData";

export function ChatConversation() {
  const { t } = useTranslation();

  const { id: chatId } = useParams<{ id: string }>();

  const chat = useMemo(() => chats.find((chat) => chat.id === chatId), [chatId]);

  if (!chat) {
    return <ErrorPage message={t("label.chatnotfound")} />;
  }

  const { recipient } = chat;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton />
          </IonButtons>

          <IonTitle>{recipient.name}</IonTitle>

          <IonRouterLink routerLink={`/chats/profile/${recipient.id}`} slot="end">
            <IonAvatar style={{ padding: "0.3rem" }}>
              <img alt={recipient.name} src={recipient.picture ?? fallbackUserImage} />
            </IonAvatar>
          </IonRouterLink>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{/* TODO: Implement chat */}</IonContent>
    </IonPage>
  );
}
