import {
  faCalendarAlt,
  faFileAlt,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Hidden,
  styled,
  Typography,
  withStyles,
} from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import api from '../../services/api';
import LicenseModal from './LicenseModal';

const Title = withStyles({
  root: {
    marginBottom: '32px',
  },
})(Typography);
const HeaderBar = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr',
  alignItems: 'center',
  padding: '40px 32px',
  background: '#FFFFFF',
  border: '1px solid #DBE5ED',
  boxSizing: 'border-box',
  boxShadow: '0px 3px 6px rgba(26, 44, 59, 0.25)',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '16px',
  },
}));
const InfoWithIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: '240px',
  '&:last-child': {
    borderLeft: '1px solid #DBE5ED',
    paddingLeft: '28px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '10px',
  },
}));
const InfoWithIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    marginBottom: '24px',
  },
}));
const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  height: '44px',
  width: '44px',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
}));
const InfoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '20px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '0px',
    paddingTop: '4px',
  },
}));
const InfoTitle = styled('h4')(({ theme }) => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '13px',
  lineHeight: '15px',
  color: '#57585B',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));
const InfoText = styled('p')(({ theme }) => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '26px',
  lineHeight: '30px',
  display: 'flex',
  alignItems: 'center',
  color: '#1F191A',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

const arrtipoLicenca = {
  0: '',
  1: 'Pré-Pago',
  2: 'Pós-Pago',
};

type Props = {
  license?: LicenseInfo;
  licenseInfo(): void;
};

const LicenseHeader = ({ license, licenseInfo }: Props): JSX.Element => {
  const inputFile = React.useRef<HTMLInputElement>(null);
  const handleClickUploadLicence = () => {
    if (inputFile.current) {
      inputFile.current.value = '';
      inputFile.current.click();
    }
  };
  const [newLicense, setNewLicense] = React.useState<
    LicenseInfo & {
      hash: string;
    }
  >();
  const handleChangeInputFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.length) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        await api
          .readLicense(text)
          .then(({ data }) => {
            setNewLicense({
              expireDate: data.Validade,
              quantity: data.Quantidade,
              type: (data.TipoLicenca as unknown) as number,
              hash: text,
            });
          })
          .catch((error) => {
            // showErrorToast('Ocorreu um erro ao carregar o arquivo de licença');
          });
      };
      reader.readAsText(event.target.files[0]);
    }
  };
  const handleConfirm = (positive: boolean) => {
    if (positive) {
      api
        .addLicense(newLicense?.hash)
        .then(() => licenseInfo())
        .catch((error) => {
          // showErrorToast('Ocorreu um erro ao carregar a licença');
        });
      // dispatch(setStateLicenceDialog(false));
    } else {
      setNewLicense(undefined);
    }
  };
  return (
    <>
      <Hidden smDown>
        <Title variant='h2'>Controle de Licenças SRC</Title>
      </Hidden>
      <HeaderBar>
        <InfoWithIconWrapper>
          {/* Licenças liberadas */}
          <InfoWithIcon>
            <IconWrapper>
              <FontAwesomeIcon icon={faFileAlt} />
            </IconWrapper>
            <InfoWrapper>
              <InfoTitle>Licenças Liberadas</InfoTitle>
              <InfoText>
                {license?.type === 1 ? license.quantity : '∞'}
              </InfoText>
            </InfoWrapper>
          </InfoWithIcon>
          {/* Data de expedição */}
          <InfoWithIcon>
            <IconWrapper>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </IconWrapper>
            <InfoWrapper>
              <InfoTitle>
                <Hidden smDown>Data de </Hidden>
                Expiração do Arquivo
              </InfoTitle>
              <InfoText>
                {license && moment(license.expireDate).isValid()
                  ? moment(license.expireDate).format('DD/MM/YYYY')
                  : license?.expireDate}
              </InfoText>
            </InfoWrapper>
          </InfoWithIcon>
        </InfoWithIconWrapper>
        {/* Tipo de licença */}
        <Hidden smDown>
          <div
            style={{
              borderLeft: '1px solid #DBE5ED',
              paddingLeft: '28px',
            }}
          >
            {(license?.type === 1 || license?.type === 2) && (
              <>
                <Typography
                  style={{
                    fontSize: '15px',
                    lineHeight: '18px',
                    color: '#1F191A',
                    marginBottom: '4px',
                  }}
                >
                  Licença
                </Typography>
                <Typography
                  style={{
                    fontSize: '12px',
                    lineHeight: '14px',
                    color: '#57585B',
                  }}
                >
                  {arrtipoLicenca[license.type]}
                </Typography>
              </>
            )}
          </div>
        </Hidden>
        {/* Botão de envio */}
        <input
          type='file'
          id='file'
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={handleChangeInputFile}
          accept='.srckey'
        />
        <Button
          variant='contained'
          color='primary'
          style={{
            borderRadius: '0px',
            border: '1px solid #0961A3',
            boxShadow: 'none',
            padding: '1rem',
          }}
          onClick={handleClickUploadLicence}
        >
          <FontAwesomeIcon icon={faUpload} style={{ marginRight: '20px' }} />
          Subir Arquivo de Licença
        </Button>
      </HeaderBar>
      {newLicense && (
        <LicenseModal open license={newLicense} onClose={handleConfirm} />
      )}
    </>
  );
};

export default LicenseHeader;
