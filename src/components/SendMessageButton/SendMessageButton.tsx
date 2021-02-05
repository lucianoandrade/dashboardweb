import React from 'react';
import { styled } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

const StyledSendMessageButton = styled('button')({
  color: '#14A0C1',
  backgroundColor: 'white',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '15px',
  padding: '12px',
  outline: 'none',
  '& svg': {
    marginRight: '8px',
  },
});

interface SendMessageButtonProps {
  onClick?(): void;
}

const SendMessageButton: React.FC<SendMessageButtonProps> = (
  props: React.PropsWithChildren<SendMessageButtonProps>
) => {
  const { children, onClick } = props;
  return (
    <StyledSendMessageButton onClick={onClick}>
      <FontAwesomeIcon icon={faCommentAlt} />
      {children || 'Enviar Mensagem'}
    </StyledSendMessageButton>
  );
};

export default SendMessageButton;
