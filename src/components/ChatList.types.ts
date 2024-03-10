import { User } from "@auth0/auth0-react";

export type Chat = {
  id: string;
  recipient: User;
  lastMessage: ChatMessage;
};

type ChatMessage = {
  text: string;
  createdAt: string;
};
