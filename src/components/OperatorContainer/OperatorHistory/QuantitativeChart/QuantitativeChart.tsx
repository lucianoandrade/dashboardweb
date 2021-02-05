import React from 'react';
import { makeStyles } from '@material-ui/core';

import Chart, { Props } from 'react-apexcharts';
import { colorArray } from '../styles';
import formatter from '../../../charts/ChartTextFormater';

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
  const formatText = (value: number) => {
    if (serieName === 'Performance') {
      return formatter(value, 'percent');
    }
    if (serieName === 'PromessaValue') {
      return formatter(value, 'BRL');
    }
    return formatter(value, 'number');
  };
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
          formatter: (val: number) => formatText(val),
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
              text: formatText(goals.floor),
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
              text: formatText(goals.standard),
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
              text: formatText(goals.super),
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
