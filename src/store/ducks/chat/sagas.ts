/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, select, all, takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getChats } from './selectors';
import {
  createChat,
  chatUpdate,
  incomingMessage,
  sendMessage,
  answerMessage,
  sendMessageOperators,
  selectGroupChat,
} from './actions';
import api from '../../../services/api';

export function* processIncoming(action: any): Generator {
  try {
    const message = action.payload as LicenseAPI.IResponsePingMessage;
    const chats = (yield select(getChats)) as Chat[];
    if (chats.length) {
      const chat = chats.find((chat) => chat.operatorId === message.codRecupDe);
      if (chat) {
        chat.messages.push({
          id: message.id,
          isMine: message.isMine || false,
          text: message.mensagem,
          date: message.dataEnvio,
        });
        chat.haveNewMessage = !message.isMine;
        return yield put(chatUpdate(chat));
      }
    }
    yield put(createChat.request(message));
  } catch (error) {
    toast('Erro ao processar Novas mensagens', { type: 'error' });
  }
}

export function* newChat(action: any): Generator {
  try {
    const message = action.payload as LicenseAPI.IResponsePingMessage;
    const operator = (yield call(api.getOperatorName, {
      id: message.codRecupDe,
    })) as string;
    const chat: Chat = {
      operatorId: message.codRecupDe,
      operatorName: operator || ' ',
      haveNewMessage: !message.isMine,
      messages: [
        {
          id: message.id,
          isMine: message.isMine || false,
          text: message.mensagem,
          date: message.dataEnvio,
        },
      ],
    };
    yield put(createChat.success(chat));
  } catch (error) {
    toast('Erro ao processar Novas mensagens', { type: 'error' });
  }
}

export function* sendMessageSaga(action: any): Generator {
  try {
    const message = action.payload as LicenseAPI.IRequestSendMessage;
    yield call(api.sendMessage, message);
    yield put(
      incomingMessage({
        id: Math.random() * 6666,
        codRecupDe: message.codigorecuperador,
        mensagem: message.mensagem,
        dataEnvio: moment().toString(),
        isMine: true,
      })
    );
  } catch (error) {
    toast('Erro ao enviar nova mensagem', { type: 'error' });
  }
}

export function* sendMessageOperatorsSaga(action: any): Generator {
  try {
    const message = action.payload as LicenseAPI.IRequestSendMessageOperators;
    yield call(api.sendMessageToOperators, message);
    for (const id of message.codigorecuperadores) {
      yield put(
        incomingMessage({
          id: Math.random() * 6666,
          codRecupDe: id,
          mensagem: message.mensagem,
          dataEnvio: moment().toString(),
          isMine: true,
        })
      );
    }
    yield put(selectGroupChat(undefined));
  } catch (error) {
    toast('Erro ao enviar nova mensagem', { type: 'error' });
  }
}

export function* answerMessageSaga(action: any): Generator {
  try {
    const message = action.payload as LicenseAPI.IResquestAnswerMessage;
    yield call(api.answerMessage, message);
    yield put(
      incomingMessage({
        id: Math.random() * 6666,
        codRecupDe: message.codigorecuperador,
        mensagem: message.mensagem,
        dataEnvio: moment().toString(),
        isMine: true,
      })
    );
  } catch (error) {
    toast('Erro ao responder mensagem', { type: 'error' });
  }
}

export default all([
  takeEvery(incomingMessage, processIncoming),
  takeEvery(createChat.request, newChat),
  takeEvery(sendMessage.request, sendMessageSaga),
  takeEvery(answerMessage.request, answerMessageSaga),
  takeEvery(sendMessageOperators.request, sendMessageOperatorsSaga),
]);
