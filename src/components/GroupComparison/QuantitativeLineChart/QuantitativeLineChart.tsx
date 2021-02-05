import React from 'react';
import Chart from 'react-apexcharts';
import formatter from '../../../util/moneyFormatter';

interface LineChartProps {
  series: Array<GroupComparison>;
  keys: Array<string>;
  viewBy: GroupViewBy;
}

export const QuantitativeLineChart: React.FC<LineChartProps> = (
  props: LineChartProps
) => {
  const { series, keys, viewBy } = props;
  const normalSeries = series.map((g) => ({
    name: g.groupName,
    data: g.groupData.map((gd) => gd.value.toFixed(2)),
  }));
  const options = {
    labels: keys,
    yaxis: {
      labels: {
        formatter: (val: number) =>
          `${viewBy === 'PromessaValue' ? formatter.format(val) : val}`,
      },
    },
    xaxis: {
      labels: {
        formatter: (val: string) => `${val?.length > 2 ? val : `${val}h`}`,
      },
    },
    colors: ['#7DE315', '#14A0C1', '#F1C422', '#1A75BA'],
    stroke: {
      width: 2,
    },
    grid: {
      row: {
        colors: ['#F9F9F9', 'transparent'],
      },
    },
    chart: {
      id: `line-Chart-${Math.random()}`,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    legend: {
      position: 'left',
      width: 200,
      height: 200,
      fontSize: '14px',
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      offsetY: 30,
      markers: {
        width: 40,
        height: 20,
        strokeColor: '#fff',
        radius: 2,
      },
      itemMargin: {
        vertical: 8,
      },
    },
  };
  return (
    <Chart series={normalSeries} options={options} type='line' height='360px' />
  );
};

export const QuantitativeLineChartMobile: React.FC<LineChartProps> = (
  props: LineChartProps
) => {
  const { series, keys, viewBy } = props;
  const options = {
    labels: keys,
    yaxis: {
      labels: {
        formatter: (val: number) =>
          `${viewBy === 'PromessaValue' ? formatter.format(val) : val}`,
      },
    },
    xaxis: {
      labels: {
        formatter: (val: string) => `${val?.length > 2 ? val : `${val}h`}`,
      },
    },
    colors: ['#7DE315', '#14A0C1', '#F1C422', '#1A75BA'],
    stroke: {
      width: 2,
    },
    grid: {
      row: {
        colors: ['#F9F9F9', 'transparent'],
      },
    },
    chart: {
      id: `line-Chart-${Math.random()}`,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    legend: {
      show: false,
      position: 'left',
      width: 200,
      height: 200,
      fontSize: '14px',
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      offsetY: 30,
      markers: {
        width: 40,
        height: 20,
        strokeColor: '#fff',
        radius: 2,
      },
      itemMargin: {
        vertical: 8,
      },
    },
  };
  const normalSeries = series.map((g) => ({
    name: g.groupName,
    data: g.groupData.map((gd) => gd.value),
  }));
  return (
    <Chart series={normalSeries} options={options} type='line' height='357px' />
  );
};
