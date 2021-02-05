import React from 'react';
import Chart from 'react-apexcharts';
import { Box, makeStyles } from '@material-ui/core';

interface CustomAngleRadialChartData {
  data: ChartData[];
  width?: number;
  heigth?: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .apexcharts-legend.apexcharts-align-center.position-left': {
      right: '46%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      '&:hover': {},
      '& .apexcharts-legend-series': {
        overflow: 'hidden',
        width: 'max-content',
        '& .apexcharts-legend-marker': {
          display: 'none',
        },
        '& .apexcharts-legend-text': {
          whiteSpace: 'nowrap',
        },
      },
    },
  },
}));

const BuildChartOptions = (data: ChartData[]) => {
  const options = {
    rawData: [...data.map((d) => d.value)],
    labels: [...data.map((d) => d.label)],
    plotOptions: {
      radialBar: {
        endAngle: 270,
      },
      hollow: {
        margin: 5,
        size: '100%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        },
      },
    },
    colors: [...data.map((d) => d.color)],
    legend: {
      show: true,
      floating: true,
      fontSize: '11px',
      position: 'left',
      labels: {
        useSeriesColors: true,
      },
      formatter: (seriesName: any, opts: any) => {
        return seriesName + ':  ' + opts.w.config.rawData[opts.seriesIndex];
      },
      markers: {
        size: 0,
      },
    },
  };
  return options;
};
const CustomAngleRadialChart: React.FC<CustomAngleRadialChartData> = (
  props: CustomAngleRadialChartData
) => {
  const { data, width = 240, heigth = 280 } = props;
  const percentData = data.map((data) => {
    return Math.round((data.value * 100) / data.maxValue);
  });
  const options = BuildChartOptions(data);
  const styles = useStyles();
  return (
    <Box
      className={styles.root}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Chart
        options={options}
        series={percentData}
        type='radialBar'
        height={heigth}
        width={width}
      />
    </Box>
  );
};

export default CustomAngleRadialChart;
