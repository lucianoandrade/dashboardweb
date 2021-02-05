import { ApexOptions } from 'apexcharts';

export const radial = (value: number, maxGoal: number): ApexOptions => ({
  series: [75],
  chart: {
    type: 'radialBar',
  },
  labels: ['ACIONAMENTOS'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#1A75BA'],
      inverseColors: true,
      stops: [0, 100],
    },
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          offsetY: 20,
          fontSize: '11px',
          fontWeight: 'normal',
          fontFamily: 'Source Sans Pro',
          color: '#57585B',
        },
        value: {
          offsetY: -14,
          fontSize: '32px',
          fontFamily: 'Source Sans Pro',
          fontWeight: 'bold',
          color: '#1A2C3B',
          formatter: (): string => `${value}`,
        },
      },
    },
  },
  stroke: {
    lineCap: 'round',
  },
});
