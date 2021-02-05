import React from 'react';

import { styled } from '@material-ui/core';
// import HeatMap from 'react-heatmap-grid';
import HeatMap from './package';

const Container = styled('div')(() => ({
  // marginBottom: 16,
}));
interface IUserPerDay {
  data: Array<AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraModel>;
}

const HeatMapChart = ({ data }: IUserPerDay) => {
  const xLabels = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sab'];
  const yLabel = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ];

  let aux = [
    { hora: '0', valor: 0 },
    { hora: '1', valor: 0 },
    { hora: '2', valor: 0 },
    { hora: '3', valor: 0 },
    { hora: '4', valor: 0 },
    { hora: '5', valor: 0 },
    { hora: '6', valor: 0 },
    { hora: '7', valor: 0 },
    { hora: '8', valor: 0 },
    { hora: '9', valor: 0 },
    { hora: '10', valor: 0 },
    { hora: '11', valor: 0 },
    { hora: '12', valor: 0 },
    { hora: '13', valor: 0 },
    { hora: '14', valor: 0 },
    { hora: '15', valor: 0 },
    { hora: '16', valor: 0 },
    { hora: '17', valor: 0 },
    { hora: '18', valor: 0 },
    { hora: '19', valor: 0 },
    { hora: '20', valor: 0 },
    { hora: '21', valor: 0 },
    { hora: '22', valor: 0 },
    { hora: '23', valor: 0 },
  ];

  let newData = [];
  // console.log(data[0].data.usuariosPorDiaDaSemanaEHora)
  // const prepareData = data[0].data.usuariosPorDiaDaSemanaEHora
  for (let prep of data) {
    let user_hour = [];
    user_hour = aux.map(
      (obj) => prep.horas.find((o) => o.hora === obj.hora) || obj
    );
    const onlyValue = user_hour.map((e) => {
      return e.valor;
    });
    newData.push(onlyValue);
  }

  return (
    <Container>
      <div
        style={{
          width: 400,
          transform: 'rotate(90deg)',
          marginLeft: -95,
          marginTop: 100,
        }}
      >
        <HeatMap
          xLabels={yLabel}
          yLabels={xLabels}
          yLabelWidth={1}
          xLabelsLocation='bottom'
          yLabelTextAlign='left'
          data={newData}
          // height={13.9}
          height={28}
          cellStyle={(
            // background: string,
            value: any,
            min: any,
            max: any
            // data: any,
            // x: any,
            // y: any
          ) => ({
            background: `rgba(26, 117, 186, ${
              1 - (max - value) / (max - min)
            })`,
            fontSize: '11px',
          })}
          cellRender={(value: any) => (value > 0 ? value : '')}
        />
      </div>
    </Container>
  );
};

export default HeatMapChart;
