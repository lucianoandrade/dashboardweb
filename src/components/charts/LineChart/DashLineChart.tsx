import React from 'react'
import ReactApexChart from 'react-apexcharts';

interface IDashChart {
  data: IHandleData[]
}

const DashLineChart = ({ data }: IDashChart) => {

  const state = {

    series: [{
      name: data[0] ? data[0].type : '',
      data: data[0] ? data[0].values : []
    },
    {
      name: data[1] ? data[1].type : '',
      data: data[1] ? data[1].values : []
    },
    ],
    dataLabels: {
      enabled: false,
    },
    options: {
      chart: {
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [2, 3, 2],
        curve: 'straight',
        dashArray: [0, 8, 5],
        colors: ['#1A75BA']
      },
      legend: {
        show: false,
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: data[0] && data[0].times,
      },
      grid: {
        borderColor: '#E5E5E5',
        row: {
          colors: ['#F9F9F9', '#fff'],
        }
      },
      tooltip: {
        enabled: false
      }
    },


  };

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type='line'
      height='346'
    />
  )
}

export default DashLineChart;