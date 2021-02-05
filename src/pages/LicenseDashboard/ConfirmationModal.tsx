import React, { PropsWithChildren } from 'react';
import { Backdrop, Button, styled, Typography } from '@material-ui/core';

const Content = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  padding: '20px',
  borderRadius: '4px',
  '& > *': {
    marginBottom: '12px',
  },
  '& > *:last-child': {
    marginBottom: '0px',
  },
}));
const ActionBar = styled('div')({
  alignSelf: 'flex-end',
});

type Props = {
  open: boolean;
  onClose(reponse: boolean): void;
};

const ConfirmationModal = ({
  children,
  open,
  onClose,
}: PropsWithChildren<Props>): JSX.Element => {
  const handleCancel = () => {
    onClose(false);
  };
  const handleConfirm = () => {
    onClose(true);
  };
  return (
    <Backdrop open={open} onClick={handleCancel} style={{ zIndex: 9 }}>
      <Content>
        <Typography variant='h3'>Confirmação</Typography>
        <Typography variant='body1'>
          Deseja realmente forçar o logout?
        </Typography>
        <Typography variant='body2'>
          OBS: O logout do usuário será realizado no próximo ciclo do SRC(30
          segundos).
        </Typography>

        <ActionBar>
          <Button onClick={handleCancel} color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            style={{ color: 'red' }}
            color='inherit'
          >
            Confirmar
          </Button>
        </ActionBar>
      </Content>
    </Backdrop>
  );
};

export default ConfirmationModal;
