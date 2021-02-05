import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import 'moment/locale/pt-br';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { Dispatch, bindActionCreators } from 'redux';
import moment from 'moment';

import { lockBodyScroll, unlockBodyScroll } from '../../util/lockBodyScroll';
import ChatPanel from './ChatPanel';
import ChatTitle from './ChatTitle';
import ChatItem from './ChatItem';
import {
  Wrapper,
  ChatItemContainer,
  ChatButton,
  NewMessageBadge,
  ChatInputArea,
  TextArea,
  SendButton,
  GroupMessageInfo,
} from './styled';
import {
  sendMessage,
  setChatReaded,
  selectChat,
  setShowChat,
  sendMessageOperators,
  selectGroupChat,
} from '../../store/ducks/chat/actions';

interface ChatProps {
  newMessage: boolean;
  chats: Array<Chat>;
  selectedChat?: Chat;
  selectedGroupChat?: GroupChat;
  showChat: boolean;
  secondButton: boolean;
  sendMessage: typeof sendMessage.request;
  sendMessageOperators: typeof sendMessageOperators.request;
  setChatReaded: typeof setChatReaded;
  selectChat: typeof selectChat;
  selectGroupChat: typeof selectGroupChat;
  setShowChat: typeof setShowChat;
}

const Chat: React.FC<ChatProps> = (props: ChatProps) => {
  const {
    chats,
    newMessage,
    secondButton,
    sendMessage,
    sendMessageOperators,
    setChatReaded,
    selectedChat,
    selectChat,
    selectedGroupChat,
    selectGroupChat,
    showChat,
    setShowChat,
  } = props;

  const msgDiv = useRef<HTMLDivElement>(null);
  const messages = selectedChat?.messages.length;
  const operatorId = selectedChat?.operatorId;
  useEffect(() => {
    if (msgDiv.current) {
      /* div.scrollTop = div.scrollHeight pra começar no final do scroll */
      msgDiv.current.scrollTop = msgDiv.current.scrollHeight;
      if (operatorId) setChatReaded(operatorId);
    }
  }, [messages, operatorId, setChatReaded]);

  const textInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (
      globalThis.innerWidth <= 600 && // Mobile
      showChat && // Janela aberta
      (chats.length > 0 || !!selectedGroupChat) // Algum chat selecionável/selecionado
    ) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
  }, [showChat, chats.length, selectedGroupChat]);
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (textInput.current && selectedChat) {
      sendMessage({
        codigorecuperador: selectedChat.operatorId,
        mensagem: textInput.current.value,
      });
      textInput.current.value = '';
    }
    if (textInput.current && selectedGroupChat) {
      sendMessageOperators({
        codigorecuperadores: selectedGroupChat.operatorsId,
        mensagem: textInput.current.value,
      });
    }
  };

  return chats.length > 0 || !!selectedGroupChat ? (
    <Wrapper>
      <ChatPanel showChat={showChat}>
        <ChatTitle
          back={() => {
            selectChat(undefined);
            selectGroupChat(undefined);
          }}
          close={() => setShowChat(false)}
          chatSelected={!!selectedChat || !!selectedGroupChat}
        >
          {selectedChat === undefined && selectedGroupChat === undefined ? (
            <Typography>Suas Conversas</Typography>
          ) : (
            <Typography>
              {(selectedChat && `Mensagem de ${selectedChat.operatorName}`) ||
                (selectedGroupChat && `Grupo: ${selectedGroupChat.groupName}`)}
            </Typography>
          )}
        </ChatTitle>
        {selectedChat === undefined && selectedGroupChat === undefined ? (
          <ChatItemContainer>
            {chats.map((chat, i) => (
              <ChatItem
                chat={chat}
                key={`chatItem-${chat.operatorId}`}
                onClick={() => selectChat(chat.operatorId)}
              />
            ))}
          </ChatItemContainer>
        ) : (
          <>
            <ChatItemContainer ref={msgDiv}>
              {selectedGroupChat ? (
                <GroupMessageInfo>
                  <FontAwesomeIcon
                    style={{
                      height: '32px',
                      width: '32px',
                      marginBottom: '8px',
                    }}
                    icon={faComments}
                  />
                  <Typography align='center'>
                    Enviando mensagem para:
                    <br />
                    <strong>
                      {`${selectedGroupChat.operatorsId.length} operadores`}
                    </strong>
                  </Typography>
                </GroupMessageInfo>
              ) : (
                selectedChat?.messages.map((message) => (
                  <div
                    style={{
                      padding: '20px',
                      margin: '20px 0px',
                      backgroundColor: message.isMine ? '#F4F7FA' : undefined,
                      borderRadius: '6px',
                    }}
                    key={`message-${message.id}`}
                  >
                    <Typography
                      style={{
                        fontSize: '12px',
                        lineHeight: '14px',
                        color: '#A0AAB5',
                        marginBottom: '8px',
                      }}
                    >
                      <strong style={{ color: '#1F191A' }}>
                        {message.isMine ? 'Você' : selectedChat.operatorName}
                      </strong>
                      {` ${moment(message.date).calendar()}`}
                    </Typography>
                    <Typography style={{ fontSize: '13px' }}>
                      {message.text}
                    </Typography>
                  </div>
                ))
              )}
            </ChatItemContainer>
            <ChatInputArea onSubmit={handleSendMessage}>
              <TextArea ref={textInput} placeholder='Escreva sua mensagem' />
              <SendButton type='submit'>Enviar</SendButton>
            </ChatInputArea>
          </>
        )}
      </ChatPanel>
      <ChatButton
        className={secondButton ? 'secondButton' : ''}
        type='button'
        onClick={() => setShowChat(!showChat)}
      >
        <FontAwesomeIcon icon={faCommentAlt} />
        {newMessage && <NewMessageBadge />}
      </ChatButton>
    </Wrapper>
  ) : null;
};

const mapStateToProps = (
  state: SRCWEB.ApplicationState
): Pick<
  ChatProps,
  | 'chats'
  | 'newMessage'
  | 'secondButton'
  | 'selectedChat'
  | 'showChat'
  | 'selectedGroupChat'
> => ({
  chats: [
    // Chats sem mensagens aparecem no topo
    ...state.chat.chats.filter((chat) => chat.messages.length === 0),
    ...state.chat.chats
      .filter((chat) => chat.messages.length > 0)
      .sort((chatA, chatB) => {
        if (chatA.messages.length > 0 && chatB.messages.length > 0) {
          return (
            moment(chatB.messages[chatB.messages.length - 1].date).valueOf() -
            moment(chatA.messages[chatA.messages.length - 1].date).valueOf()
          );
        }
        return 1;
      }),
  ],
  newMessage: state.chat.haveNewMessages,
  secondButton:
    state.groups.groups.length === 0 ||
    state.groups.view === 'comparison' ||
    (!!state.groups.selectedGroup &&
      (state.operators.view === 'comparison' ||
        state.operators.view === 'history')),
  selectedChat: state.chat.chats.find(
    (chat) => chat.operatorId === state.chat.selectedChat
  ),
  selectedGroupChat: state.chat.selectedGroup,
  showChat: state.chat.showChat,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      sendMessage: sendMessage.request,
      sendMessageOperators: sendMessageOperators.request,
      selectGroupChat,
      setChatReaded,
      selectChat,
      setShowChat,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
