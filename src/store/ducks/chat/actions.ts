import { createAsyncAction, createAction } from 'typesafe-actions';

export const incomingMessage = createAction('incomingMessage/PROCESS')<
  LicenseAPI.IResponsePingMessage
>();
export const persistRehydrate = createAction('persist/REHYDRATE')<
  SRCWEB.ApplicationState
>();
export const chatUpdate = createAction('incomingMessage/PUSH')<Chat>();
export const setChatReaded = createAction('setChat/READED')<number>();
export const selectChat = createAction('chat/SELECT')<number | undefined>();
export const selectGroupChat = createAction('chat/SELECT_GROUP')<
  GroupChat | undefined
>();
export const setShowChat = createAction('chat/SHOW_HIDE')<boolean>();

export const sendMessage = createAsyncAction(
  'sendMessage/REQUEST',
  'sendMessage/SUCESS',
  'sendMessage/FALIURE'
)<LicenseAPI.IRequestSendMessage, Chat, undefined>();

export const sendMessageOperators = createAsyncAction(
  'sendMessageOperators/REQUEST',
  'sendMessageOperators/SUCESS',
  'sendMessageOperators/FALIURE'
)<LicenseAPI.IRequestSendMessageOperators, Chat, undefined>();

export const answerMessage = createAsyncAction(
  'answerMessage/REQUEST',
  'answerMessage/SUCESS',
  'answerMessage/FALIURE'
)<LicenseAPI.IResquestAnswerMessage, Chat, undefined>();

export const createChat = createAsyncAction(
  'createChat/REQUEST',
  'createChat/SUCESS',
  'createChat/FALIURE'
)<LicenseAPI.IResponsePingMessage, Chat, undefined>();
