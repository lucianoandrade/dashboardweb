import { createReducer } from 'typesafe-actions';
import {
  createChat,
  chatUpdate,
  setChatReaded,
  persistRehydrate,
  selectChat,
  setShowChat,
  selectGroupChat,
} from './actions';

const INIT_STATE: ChatState = {
  haveNewMessages: false,
  chats: [],
  showChat: true,
};

export default createReducer(INIT_STATE)
  .handleAction(chatUpdate, (state: ChatState, action) => ({
    ...state,
    haveNewMessages:
      action.payload.haveNewMessage ||
      !!state.chats.find((c) => c.haveNewMessage),
    showChat: true, // Abrir a tela de chat sempre que uma mensagem chegar
    chats: [
      ...state.chats.map((c) => {
        if (c.operatorId === action.payload.operatorId) {
          return action.payload;
        }
        return c;
      }),
    ],
  }))
  .handleAction(setChatReaded, (state, action) => {
    const chats = [
      ...state.chats.map((c) => {
        if (c.operatorId === action.payload) {
          return { ...c, haveNewMessage: false };
        }
        return c;
      }),
    ];
    return {
      ...state,
      chats,
      haveNewMessages: !!chats.find((c) => c.haveNewMessage),
    };
  })
  .handleAction(createChat.success, (state, action) => ({
    ...state,
    haveNewMessages:
      !!state.chats.find((c) => c.haveNewMessage) ||
      action.payload.haveNewMessage,
    chats: state.chats.find((c) => action.payload.operatorId === c.operatorId)
      ? [...state.chats]
      : [...state.chats, action.payload],
  }))
  .handleAction(persistRehydrate, () => ({ ...INIT_STATE }))
  .handleAction(setShowChat, (state, action) => ({
    ...state,
    showChat: action.payload,
  }))
  .handleAction(selectChat, (state, action) => ({
    ...state,
    selectedChat: action.payload,
  }))
  .handleAction(selectGroupChat, (state, action) => ({
    ...state,
    selectedGroup: action.payload,
  }));
