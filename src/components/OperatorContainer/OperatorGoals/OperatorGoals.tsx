import React from 'react';
import { Box, Typography, makeStyles, Theme } from '@material-ui/core';

import PolarChart from '../../charts/PolarChart';
import formater from '../../charts/ChartTextFormater';

interface OperatorGoalsProps {
  operator: Operator;
  showText: boolean;
  variant: 'list' | 'history';
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  history: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  graphContainer: {},
  infoContainer: {},
}));

export default (props: OperatorGoalsProps) => {
  const styles = useStyles();
  const { operator, showText, variant = 'list' } = props;
  const data: ChartData[] = [
    {
      label: 'Acionamento Positivo',
      color: '#7DE315aa',
      value: operator.acionamentoPositive,
      maxValue: operator.metas.standard.positiveActuation,
      type: 'number',
    },
    {
      label: 'Valor de Promessas',
      color: '#02CC9Caa',
      value: operator.promessaValue,
      maxValue: operator.metas.standard.promisesValue,
      type: 'BRL',
    },
    {
      label: 'Tempo Efetivo',
      color: '#14A0C1aa',
      value: operator.workTime || 1,
      maxValue: operator.metaAtendimento || operator.workTime || 1,
      type: 'HH:mm:ss',
    },
    {
      label: 'Promessas x Acionamento',
      color: '#5159ACaa',
      value: operator.percentage,
      maxValue: operator.metas.standard.promiseActuationRatio,
      type: 'percent',
    },
    {
      label: 'Valor  de Pagamentos',
      color: '#1A75BAaa',
      value: operator.paymentValue,
      maxValue: operator.metas.standard.paymentValue,
      type: 'BRL',
    },
    {
      label: 'Quantidade  de Promessas',
      color: '#08909Eaa',
      value: operator.promessaTotal,
      maxValue: operator.metas.standard.promises,
      type: 'number',
    },
  ];
  return (
    <Box className={[styles.root, styles[variant]].join(' ')}>
      <Box>
        <PolarChart data={data} />
      </Box>
      {showText ? (
        <Box className={styles.infoContainer}>
          {data.map((d) => (
            <Typography component='div' key={d.label} paragraph>
              <Typography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '12px',
                  lineHeight: '15px',
                  color: '#57585B',
                }}
                variant='body2'
              >
                {d.label}
              </Typography>
              <Typography
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  lineHeight: '18px',
                  color: '#1F191A',
                }}
              >
                <strong>{formater(d.value, d.type)}</strong>
                {' | '}
                {formater(d.maxValue, d.type)}
              </Typography>
            </Typography>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};
