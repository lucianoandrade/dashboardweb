import React from 'react';
import { Box } from '@material-ui/core';
import { Polar, ChartComponentProps } from 'react-chartjs-2';

import formatter from '../../../util/moneyFormatter';
import useStyles from './styles';

const getPercentage = (actual: number, max: number) => actual / max;
const formatPercentage = (number: number) => Math.round(number * 100);

const generatePolarData = (
  values: GroupValue,
  goals: GroupValue
): Array<number> => {
  const result = [];
  result.push(
    formatPercentage(
      getPercentage(values.positiveActuation, goals.positiveActuation)
    )
  );
  result.push(formatPercentage(getPercentage(values.promises, goals.promises)));
  result.push(
    formatPercentage(getPercentage(values.promisesValue, goals.promisesValue))
  );
  result.push(
    formatPercentage(getPercentage(values.paymentValue, goals.paymentValue))
  );
  result.push(
    formatPercentage(
      getPercentage(values.promiseActuationRatio, goals.promiseActuationRatio)
    )
  );
  return result;
};

const polar = (
  data: Array<number>,
  rawData: Array<number | string>
): ChartComponentProps => ({
  legend: {
    display: false,
  },
  options: {
    maintainAspectRatio: false,
    scaleShowGridLines: false,
    responsive: false,
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) =>
          ` ${data.labels[tooltipItem.index]}: ${rawData[tooltipItem.index]}`,
      },
    },
  },
  data: {
    labels: [
      'Acionamento Positivo',
      'Promessas Realizadas',
      'Valor das Promessas',
      'Valor de Pagamentos',
      'Promessas x Acionamentos',
    ],
    datasets: [
      {
        backgroundColor: [
          '#7DE315aa',
          '#02CC9Caa',
          '#14A0C1aa',
          '#5159ACaa',
          '#1A75BAaa',
          '#08909Eaa',
        ],
        data,
      },
    ],
  },
});

const PolarChart: React.FC<GroupData> = (props: GroupData) => {
  const { values, goals } = props;
  const polarData = generatePolarData(values, goals.standard);
  const polarChartProps = polar(polarData, [
    values.positiveActuation,
    values.promises,
    formatter.format(values.promisesValue),
    formatter.format(values.paymentValue),
    values.promiseActuationRatio,
  ]);
  const styles = useStyles();
  return (
    <Box className={styles.root}>
      <Polar {...polarChartProps} height={145} />
      <div className={styles.labels}>
        <div>AP</div>
        <div>PR</div>
        <div>VP</div>
        <div>PG</div>
        <div>PxA</div>
      </div>
    </Box>
  );
};

export default PolarChart;
