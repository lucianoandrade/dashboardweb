import { Box } from '@material-ui/core';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { state } from './data';
import useStyles from './styles';

interface PairedValues {
  y: number;
  x: string;
}

interface ChartProps {
  series?: Array<{
    name: string;
    data: PairedValues[];
  }>;
}

const BasicChart: React.FC<ChartProps> = ({ series }: ChartProps) => {
  const styles = useStyles();

  return (
    <Box className={styles.header}>
      <ReactApexChart
        options={state.options}
        series={series ?? state.series}
        type='bar'
        width='95%'
        height={360}
      />
    </Box>
  );
};

export default BasicChart;
