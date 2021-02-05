import React from 'react';
import { Box } from '@material-ui/core';
import { Polar, ChartComponentProps } from 'react-chartjs-2';
import formater from '../ChartTextFormater';
import useStyles from './styles';

const buildChartOptions = (data: ChartData[]): ChartComponentProps => {
  const percentData = data.map((data) => (data.value * 100) / data.maxValue);
  const options: ChartComponentProps = {
    legend: {
      display: false,
    },
    options: {
      maintainAspectRatio: false,
      scaleShowGridLines: false,
      responsive: false,
      tooltips: {
        callbacks: {
          label: (tooltipItem: any, graph: any) =>
            ` ${graph.labels[tooltipItem.index]}: ${formater(
              data[tooltipItem.index].value,
              data[tooltipItem.index].type
            )}`,
        },
      },
    },
    data: {
      labels: [...data.map((d) => d.label)],
      datasets: [
        {
          backgroundColor: [...data.map((d) => d.color)],
          data: percentData,
        },
      ],
    },
  };
  return options;
};

interface PolarChartData {
  label: string;
  color: string;
  maxValue: number;
  value: number;
}

interface PolarChartProps {
  data: ChartData[];
}

const PolarChart: React.FC<PolarChartProps> = (props: PolarChartProps) => {
  const { data } = props;
  const chartData = buildChartOptions(data);
  const styles = useStyles();
  return (
    <Box className={styles.root}>
      <Polar {...chartData} width={250} height={190} />
      <div className={styles.labels}>
        <div>AP</div>
        <div>VP</div>
        <div>TE</div>
        <div>PxA</div>
        <div>PG</div>
        <div>PR</div>
      </div>
    </Box>
  );
};

export default PolarChart;
