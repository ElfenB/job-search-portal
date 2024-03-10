import { IonList, IonListHeader } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { chats } from "./ChatList.mockData";
import { ChatListItem } from "./ChatListItem";

export function ChatList() {
  const { t } = useTranslation();

  return (
    <IonList lines="full">
      <IonListHeader>{t("label.conversations")}</IonListHeader>

      {chats.map((chat) => (
        <ChatListItem chat={chat} key={chat.id} />
      ))}
    </IonList>
  );
}
