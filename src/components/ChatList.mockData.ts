import { Chat } from "./ChatList.types";

export const chats: Chat[] = [
  {
    id: "1",
    lastMessage: {
      text: "Hey there! Just wanted to say hi!",
      createdAt: "2024-03-09T09:30:00Z",
    },
    recipient: {
      name: "John Doe",
      picture: "https://i.pravatar.cc/300",
    }
  },
  {
    id: "2",
    lastMessage: {
      text: "Guess what? I just found a hidden treasure!",
      createdAt: "2024-03-08T14:45:00Z",
    },
    recipient: {
      name: "Jane Doe",
      picture: "https://i.pravatar.cc/400",
    }
  },
  {
    id: "3",
    lastMessage: {
      text: "I have a secret to tell you... I can fly!",
      createdAt: "2024-03-07T18:20:00Z",
    },
    recipient: {
      name: "John Smith",
      picture: "https://i.pravatar.cc/500",
    }
  },
  {
    id: "4",
    lastMessage: {
      text: "Did you know that I can speak five languages?",
      createdAt: "2024-03-06T11:10:00Z",
    },
    recipient: {
      name: "Jane Smith",
      picture: "https://i.pravatar.cc/600",
    }
  },
  {
    id: "5",
    lastMessage: {
      text: "I just climbed Mount Everest! It was amazing!",
      createdAt: "2024-03-05T16:55:00Z",
    },
    recipient: {
      name: "John Johnson",
      picture: "https://i.pravatar.cc/700",
    }
  },
];
