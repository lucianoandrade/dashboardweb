import React, { ReactNode } from 'react';
import { styled } from '@material-ui/core';

const ChatPanelDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '373px',
  width: '320px',
  marginBottom: '16px',
  background: '#FFFFFF',
  border: '1px solid #DBE5ED',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.12), 0px 0px 4px #FFFFFF',
  borderRadius: '4px',
  [theme.breakpoints.down('xs')]: {
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    height: '95vh',
    width: '100vw',
    zIndex: 2,
    marginBottom: '0px',
  },
}));

interface ChatPanelProps {
  children?: ReactNode;
  showChat?: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = (props: ChatPanelProps) => {
  const { children, showChat } = props;
  return showChat ? <ChatPanelDiv>{children}</ChatPanelDiv> : null;
};

export default ChatPanel;
