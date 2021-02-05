import React from 'react';
import { styled, Typography } from '@material-ui/core';
import moment from 'moment';

const ChatItemDiv = styled('div')({
  borderBottom: '1px solid #DBE5ED',
  padding: '16px 0px',
  cursor: 'pointer',
  '&:last-child': {
    borderBottom: '0px',
  },
});

const ChatIdentificationDiv = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
});

interface ChatItemProps {
  chat: Chat;
  onClick(): void;
}

const ChatItem: React.FC<ChatItemProps> = (props: ChatItemProps) => {
  const { chat, onClick } = props;
  return (
    <ChatItemDiv onClick={onClick}>
      <ChatIdentificationDiv>
        <Typography
          style={{
            fontStyle: chat.haveNewMessage ? 'italic' : 'normal',
            fontWeight: 'bold',
            fontSize: '12px',
            lineHeight: '14px',
            color: '#1A2C3B',
          }}
        >
          {chat.operatorName}
        </Typography>
        <Typography
          style={{
            fontSize: '12px',
            lineHeight: '14px',
            color: '#60788C',
          }}
        >
          {chat.messages.length > 0 &&
            moment(chat.messages[chat.messages.length - 1].date).fromNow()}
        </Typography>
      </ChatIdentificationDiv>
      <Typography
        style={{
          fontSize: '13px',
          lineHeight: '18px',
          color: '#1F191A',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginTop: '4px',
        }}
      >
        {chat.messages.length > 0 &&
          chat.messages[chat.messages.length - 1].text}
      </Typography>
    </ChatItemDiv>
  );
};

export default ChatItem;
