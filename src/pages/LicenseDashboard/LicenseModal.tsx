import { Backdrop, Button, styled, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { PropsWithChildren } from 'react';

const arrtipoLicenca = ['', 'Pré-Pago', 'Pós-Pago'];
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
  license: LicenseInfo;
};

const LicenseModal = ({
  open,
  onClose,
  license,
}: PropsWithChildren<Props>): JSX.Element => {
  const { expireDate, quantity, type } = license;
  const handleCancel = () => {
    onClose(false);
  };
  const handleConfirm = () => {
    onClose(true);
  };
  return (
    <Backdrop open={open} onClick={handleCancel} style={{ zIndex: 9 }}>
      <Content>
        <Typography variant='h3'>
          Deseja realmente substituir a licença atual?
        </Typography>
        <Typography variant='body2'>{`Quantidade: ${quantity}`}</Typography>
        <Typography variant='body2'>
          {'Expiração: '}
          {`${moment(expireDate).format('DD/MM/YYYY')}`}
        </Typography>
        <Typography variant='body2'>
          {'Tipo de Licença: '}
          {`${arrtipoLicenca[type]}`}
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

export default LicenseModal;
