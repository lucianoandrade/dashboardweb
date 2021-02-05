export const getChats = (state: SRCWEB.ApplicationState): Chat[] => ([
  ...state.chat.chats
])

export const getOperatorId = (state: SRCWEB.ApplicationState): number => state.login.user?.COD_RECUP || 0;