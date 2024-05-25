import { useCallback, useMemo } from "react";
import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { fallbackUserImage } from "./ChatList.consts";
import type { Chat } from "./ChatList.types";

type Props = {
  chat: Chat;
};

export function ChatListItem({ chat }: Props) {
  const { t } = useTranslation();

  const { id: chatId, lastMessage, recipient } = chat;

  const handleDelete = useCallback(() => {
    // TODO: Implement delete chat
    console.log("Delete chat with", recipient.name);
  }, [recipient.name]);

  const formattedTime = useMemo(
    () => new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    [lastMessage.createdAt],
  );

  return (
    <IonItemSliding>
      <IonItem detail routerDirection="forward" routerLink={`/chats/${chatId}`}>
        <IonAvatar aria-hidden="true" slot="start">
          <img alt={recipient.name} src={recipient.picture ?? fallbackUserImage} />
        </IonAvatar>

        <IonLabel>
          <h2>{recipient.name}</h2>
          <p>{lastMessage.text}</p>
        </IonLabel>

        <time dateTime={formattedTime} slot="end">
          {formattedTime}
        </time>
      </IonItem>

      <IonItemOptions>
        <IonItemOption color="danger" onClick={handleDelete}>
          {t("label.delete")}
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}
