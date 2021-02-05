import React from 'react';
import { Line } from 'react-chartjs-2';

interface Props {
  accesses: Array<LicenseUsageData>;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

function AccessChart({ accesses, onSelectDate }: Props): JSX.Element {
  return (
    <Line
      getElementAtEvent={(e) => {
        if (Array.isArray(e)) {
          const dataindex = e[0]?._index;
          if (dataindex) {
            onSelectDate(e[0]?._xScale._ticks[dataindex].value);
          }
        }
      }}
      data={{
        labels: accesses.map((element) => element.date).reverse(),
        datasets: [
          {
            backgroundColor: 'rgba(17,186,169, .2)',
            borderColor: 'rgb(17,186,169)',
            data: accesses.map((element) => element.quantity).reverse(),
            label: 'Acessos',
            fill: 'start',
          },
        ],
      }}
      options={{
        showLines: true,
        elements: {
          line: {
            tension: 0.000001,
          },
        },
        spanGaps: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback(value: any) {
                  if (Number.isInteger(value)) {
                    return value;
                  }
                  return 0;
                },
                stepSize: 1,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 9,
              },
            },
          ],
        },
      }}
    />
  );
}

export default AccessChart;
