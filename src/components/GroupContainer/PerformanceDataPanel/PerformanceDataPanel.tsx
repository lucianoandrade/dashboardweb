import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import formatter from '../../../util/moneyFormatter';

type PerformanceProps = GroupData;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '12px',
    '& > h5': {
      // fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '15px',
      alignItems: 'center',
      color: '#57585B',
      marginTop: '12px',
      marginBottom: '4px',
    },
    '& > p': {
      // fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '18px',
      alignItems: 'center',
      color: '#1F191A',
      '& > strong': {
        marginRight: '4px',
      },
    },
    '& span': {
      margin: '2px',
    },
  },
}));

const PerformanceDataPanel: React.FC<PerformanceProps> = (
  props: PerformanceProps
) => {
  const { values, goals } = props;
  const styles = useStyles();
  return (
    <Box className={styles.root}>
      <h5>Acionamentos Positivos</h5>
      <p>
        <strong>{values.positiveActuation}</strong>
        <span>|</span>
        <span>{` ${goals.standard.positiveActuation}`}</span>
      </p>
      <h5>Promessas Realizadas</h5>
      <p>
        <strong>{values.promises}</strong>
        <span>|</span>
        <span>{` ${goals.standard.positiveActuation}`}</span>
      </p>
      <h5>Valor das Promessas</h5>
      <p>
        <strong>{formatter.format(values.promisesValue)}</strong>
        <span>|</span>
        <span>{` ${formatter.format(goals.standard.promisesValue)}`}</span>
      </p>
      <h5>Valor de Pagamentos</h5>
      <p>
        <strong>{formatter.format(values.paymentValue)}</strong>
        <span>|</span>
        <span>{` ${formatter.format(goals.standard.paymentValue)}`}</span>
      </p>
      <h5>Promessas x Acionamentos</h5>
      <p>
        <strong>{`${values.promiseActuationRatio}%`}</strong>
        <span>|</span>
        <span>{` ${goals.standard.promiseActuationRatio.toFixed(1)}%`}</span>
      </p>
    </Box>
  );
};

export default PerformanceDataPanel;
