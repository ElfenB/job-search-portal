import { IonList, IonListHeader } from "@ionic/react";
import { ChatListItem } from "./ChatListItem";
import { chats } from "./ChatList.mockData";

export function ChatList() {
  return (
    <IonList lines="full">
      <IonListHeader>Your conversations</IonListHeader>

      {chats.map((chat) => (
        <ChatListItem key={chat.id} chat={chat} />
      ))}
    </IonList>
  );
}
