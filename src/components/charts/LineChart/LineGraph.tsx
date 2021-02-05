import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@material-ui/core';
import moment from 'moment';
import useStyles from './styles';

interface Props {
  value?: Array<any>;
  dispositivosUtilizados:Array<any>;
}

const LineGraph = (props: Props) => {
  const { value, dispositivosUtilizados } = props;
  const styles = useStyles();
  const series = new Array;

  dispositivosUtilizados.map(e => {
    const time = e.porHora ? e.porHora : e.porData;
    time.map((t: any) => series.push({
      "name": `${t.identificador}`,
      "data": t.array.map((i: any) => i.valor),
      "porHora": e.porHora ? t.array.map((i: any) => `${i.chave}h`) : null,
      "porData": e.porData ? t.array.map((i: any) => `${moment(i.chave).format('DD')}`) : null
    }))
  });

  const state = {
    series,

    options: {
      colors: ['#1A75BA', '#14A0C1', '#02CC9C'],

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

      xaxis: {
        categories: series.map(e => e.porHora ? e.porHora : e.porData)[0],
      },
    },
  };

  return (
    <>
      <Box className={styles.header}>
        <ReactApexChart
          options={state.options}
          series={value ? value : state.series}
          type='line'
          width='95%'
          height='400'
        />
      </Box>
      <Box className={styles.graphDevice}>
      {series.map((item, index) => 
        <div className={styles.device}>
          <span className={styles[index+1]}></span>{item.name}
        </div>
      )}
      </Box>
    </>
  );
};

export default LineGraph;
