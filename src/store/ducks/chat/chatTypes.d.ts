declare interface ChatState {
  haveNewMessages: boolean;
  selectedChat?: number; // operatorId
  selectedGroup?: GroupChat;
  showChat: boolean;
  chats: Chat[];
}

declare interface Chat {
  operatorId: number;
  operatorName: string;
  haveNewMessage: boolean;
  messages: Message[];
}
declare interface GroupChat {
  operatorsId: number[];
  groupName: string;
}

declare interface Message {
  id: number;
  text: string;
  isMine: boolean;
  date: string;
}

declare interface incomingSelector {
  id: number;
  chats: Chat[];
}
