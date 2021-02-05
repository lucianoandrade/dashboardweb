import React, { ReactNode } from 'react';
import { styled, useTheme, useMediaQuery } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ChatTitleDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  borderBottom: '1px solid #DBE5ED',
  flexShrink: 0,
  '& > p:nth-child(2)': {
    [theme.breakpoints.up('sm')]: {
      marginRight: 'auto',
      marginLeft: '16px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    justifyContent: 'center',
  },
}));

const Button = styled('button')(({ theme }) => ({
  background: 'transparent',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  color: '#14A0C1',
  [theme.breakpoints.down('xs')]: {
    position: 'absolute',
    left: '10px',
  },
}));

interface ChatTitleProps {
  children?: ReactNode;
  chatSelected?: boolean;
  back(): void;
  close(): void;
}

const ChatTitle: React.FC<ChatTitleProps> = (props: ChatTitleProps) => {
  const { children, back, close, chatSelected } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <ChatTitleDiv>
      {chatSelected &&
        (mobile ? (
          <Button onClick={back}>Voltar</Button>
        ) : (
          <FontAwesomeIcon
            style={{ cursor: 'pointer' }}
            onClick={back}
            icon={faChevronLeft}
          />
        ))}
      {children}
      {!chatSelected &&
        (mobile ? (
          <Button onClick={close}>Fechar</Button>
        ) : (
          <FontAwesomeIcon
            style={{ cursor: 'pointer' }}
            onClick={close}
            icon={faTimes}
          />
        ))}
    </ChatTitleDiv>
  );
};

export default ChatTitle;
