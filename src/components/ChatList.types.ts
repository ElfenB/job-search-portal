import type { User } from '@auth0/auth0-react';

export type Chat = {
  id: string;
  lastMessage: ChatMessage;
  recipient: User;
};

type ChatMessage = {
  createdAt: string;
  text: string;
};
