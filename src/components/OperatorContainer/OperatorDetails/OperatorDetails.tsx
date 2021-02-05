import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {
  Box,
  Card,
  CardHeader,
  makeStyles,
  CardContent,
  Hidden,
} from '@material-ui/core';
import DataDisplay from './DataDisplay';
import { loadOperatorDetails } from '../../../store/ducks/operators/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      height: 'auto',
    },
  },
  card: {
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.12), 0px 0px 4px #FFFFFF',
    border: '1px solid #DBE5ED',
    marginTop: '32px',
    marginBottom: '32px',
    '& > :last-child': {
      paddingBottom: '0px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      margin: '0px',
      height: 'auto',
    },
  },
  cardHeader: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      /* H4 */
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '25px',
      /* Dark Blue */
      color: '#1A2C3B',
    },
  },
  headerDivision: {
    height: '10px',
    marginTop: '-10px',
    width: '100%',
    background:
      'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%);',
  },
  cardContent: {
    padding: '28px 28px 0px 28px',
    [theme.breakpoints.down('xs')]: {
      padding: '20px 20px 0px 20px',
    },
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

interface OperatorDetailsProps {
  COD_RECUP?: number;
  details?: GQL.IResponseUserDetail;
  loadOperatorDetails(): void;
}

const OperatorDetail = (props: OperatorDetailsProps) => {
  const { COD_RECUP, details, loadOperatorDetails } = props;
  const styles = useStyles();
  useEffect(() => {
    loadOperatorDetails();
  }, [loadOperatorDetails, COD_RECUP]);
  return (
    <Box className={styles.root}>
      <Card className={styles.card}>
        <Hidden xsDown>
          <CardHeader
            className={styles.cardHeader}
            title='Dados do operador'
            titleTypographyProps={{
              variant: 'h4',
            }}
          />
          <Box className={styles.headerDivision} />
        </Hidden>
        <CardContent className={styles.cardContent}>
          <Box className={styles.content}>
            <DataDisplay title='Código' value={details?.COD_RECUP || '-'} />
            <DataDisplay
              title='Tipo de usuário'
              value={details?.TIPO_USUARIO || '-'}
            />
            <DataDisplay title='Nome' value={details?.NOME_RECUP || '-'} />
            <DataDisplay
              title='E-mail'
              value={details?.EMAIL_RECUP || '-'}
              size='large'
            />
            <DataDisplay title='Filial' value={details?.NOME_FILIAL || '-'} />
            <DataDisplay
              title='Telefone'
              value={details?.CELULAR_RECUP || '-'}
            />
            <DataDisplay title='Ramal' value={details?.RAMAL || '-'} />
            <DataDisplay
              title='Entrada'
              value={details?.HORA_ENTRADA || '-'}
              size='small'
            />
            <DataDisplay
              title='Saída'
              value={details?.HORA_SAIDA || '-'}
              size='small'
            />
            <DataDisplay
              title='Intervalo'
              value={details?.TIPOINTERVALO_CAR || '-'}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  details: state.operators.selectedOperator.details,
  COD_RECUP: state.operators.selectedOperator.operator?.COD_RECUP,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadOperatorDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OperatorDetail);
