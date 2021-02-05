import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Title } from './styles';

interface IChartBar {
  legend?: string;
  data: Array<AnalyticGQL.IDashboardAtivos>;
}

const Bar: React.FC<IChartBar> = ({ legend, data }: IChartBar) => {
  const state = {
    series: [
      {
        name: 'Visualizações',
        // data: handleData[0].values.map((e) => e.minuto),
        data: data.map(
          (e) => e.indicador === 'Ultimos20min' && e.values.map((f) => f.minuto)
        ),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#DBE5ED'],
      grid: {
        show: false,
      },
      xaxis: {
        position: 'top',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        floating: true,
        labels: {
          show: false,
          align: 'right',
          maxWidth: -20,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <Title>{legend}</Title>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='bar'
        height={130}
      />
    </>
  );
};

export default Bar;
