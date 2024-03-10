import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { Chat } from "./ChatList.types";
import { useCallback, useMemo } from "react";
import { fallbackUserImage } from "./ChatList.consts";

type Props = {
  chat: Chat;
};

export function ChatListItem({ chat }: Props) {
  const { recipient, lastMessage, id: chatId } = chat;

  const handleDelete = useCallback(() => {
    // TODO: Implement delete chat
    console.log("Delete chat with", recipient.name);
  }, []);

  const formattedTime = useMemo(
    () => new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    [lastMessage.createdAt],
  );

  return (
    <IonItemSliding>
      <IonItem routerLink={`/chats/${chatId}`} detail routerDirection="forward">
        <IonAvatar slot="start" aria-hidden="true">
          <img src={recipient.picture ?? fallbackUserImage} alt={recipient.name} />
        </IonAvatar>

        <IonLabel>
          <h2>{recipient.name}</h2>
          <p>{lastMessage.text}</p>
        </IonLabel>

        <time slot="end" dateTime={formattedTime}>
          {formattedTime}
        </time>
      </IonItem>

      <IonItemOptions>
        <IonItemOption color="danger" onClick={handleDelete}>
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}
