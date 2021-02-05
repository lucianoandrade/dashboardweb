import React from 'react';
import { makeStyles } from '@material-ui/core';

import Chart, { Props } from 'react-apexcharts';
import formatter from '../../../util/moneyFormatter';
import { colorArray } from '../styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '28px',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
      borderRadius: '4px',
      background: '#E8EAED',
      boxShadow: 'inset 1px 1px 1px rgba(0, 0, 0, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#A0AAB5',
      borderRadius: '4px',
    },
  },
}));

interface Serie {
  name: string;
  data: Array<number>;
}

interface LineChartProps {
  serieName: string;
  series: Array<Serie>;
  keys: Array<string>;
  goals: {
    floor: number;
    standard: number;
    super: number;
  };
}

const BarChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const { serieName, series, keys, goals } = props;
  const styles = useStyles();
  const chartProps: Props = {
    series,
    options: {
      labels: keys,
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          formatter: (val: number) =>
            `${serieName === 'PromessaValue' ? formatter.format(val) : val}`,
        },
      },
      annotations: {
        yaxis: [
          {
            y: goals.floor,
            borderColor: '#C73228',
            label: {
              borderColor: '#C73228',
              style: {
                color: '#fff',
                background: '#C73228',
              },
              text: `${
                serieName === 'PromessaValue'
                  ? formatter.format(goals.floor)
                  : goals.floor || 0
              }`,
            },
          },
          {
            y: goals.standard,
            borderColor: '#F1C422',
            label: {
              borderColor: '#F1C422',
              style: {
                color: '#fff',
                background: '#F1C422',
              },
              text: `${
                serieName === 'PromessaValue'
                  ? formatter.format(goals.standard)
                  : goals.standard || 0
              }`,
            },
          },
          {
            y: goals.super,
            borderColor: '#4CBE22',
            label: {
              borderColor: '#4CBE22',
              style: {
                color: '#fff',
                background: '#4CBE22',
              },
              text: `${
                serieName === 'PromessaValue'
                  ? formatter.format(goals.super)
                  : goals.super || 0
              }`,
            },
          },
        ],
      },
      colors: colorArray,
      grid: {
        row: {
          colors: ['#F9F9F9', 'transparent'],
        },
      },
      stroke: {
        width: 2,
      },
      chart: {
        id: `bar-Chart-${Math.random()}`,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
    },
    type: 'line',
    height: '436px',
    width: '820px',
  };
  return (
    <div className={styles.root}>
      <Chart {...chartProps} />
    </div>
  );
};

export default BarChart;
