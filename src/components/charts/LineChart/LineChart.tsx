import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@material-ui/core';

import useStyles from './styles';

interface ChartData {
  x: string | number;
  y: number;
}

interface Serie {
  name: string;
  data: Array<ChartData>;
}

interface Props {
  value?: Array<Serie>;
}

const LineChart: React.FC<Props> = (props: Props) => {
  const { value } = props;

  const styles = useStyles();

  const state = {
    options: {
      colors: ['#7DE315', '#14A0C1', '#F1C422', '#1A75BA'],

      stroke: {
        width: 2,
        dashArray: 0,
        curve: 'straight',
      },

      chart: {
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },

      grid: {
        row: {
          colors: ['#F9F9F9', 'transparent'],
        },
      },

      legend: {
        show: false,
      },
    },
  };

  return (
    <Box className={styles.header}>
      <ReactApexChart
        options={state.options}
        series={value}
        type='line'
        width='95%'
        height='400'
      />
    </Box>
  );
};

export default LineChart;
