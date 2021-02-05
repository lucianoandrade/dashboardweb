import { styled, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticsDatePicker from '../../components/AnalyticsDatePicker';
import HeatMap from '../../components/charts/HeatMap';
import { activeUsersDayHour } from '../../store/ducks/analytic/actions';

interface IUserPerDay {
  data: Array<AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraModel>;
  selectPosition: IntervalTypes;
  dateInterval: DateInterval;
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    marginLeft: 20,
    width: 285,
  },
  [theme.breakpoints.between('xs', 'md')]: {
    marginLeft: 0,
    marginRight: 20,
    width: 285,
  },
  [theme.breakpoints.down('xs')]: {
    marginLeft: 0,
    width: '100%',
  },
}));

const CardSection = styled('div')(({ theme }) => ({
  border: '1px solid #DBE5ED',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 4px #FFFFFF, 0px 0px 8px rgba(0, 0, 0, 0.12)',
  borderRadius: 4,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    marginBottom: '20px',
  },
}));

const DetailInfo = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 20px',
  borderTop: '1px solid #DBE5ED',
}));

const Title = withStyles({
  root: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
})(Typography);

const ChartWrapper = styled('div')(() => ({
  display: 'flex',
  width: 240,
  margin: '0 auto',
}));

const YLabel = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const TextLabelY = styled('span')(() => ({
  fontSize: 12,
  height: 16.67,
  marginBottom: 16.67,
  paddingTop: 2,
  paddingBottom: 2
}));

const XLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  marginLeft: 5,
  marginTop: 4,
  justifyContent: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    marginLeft: -20,
  },
}));

const TextLabelX = styled('span')(() => ({
  fontSize: 11,
  width: 29,
  textAlign: 'center',
  paddingLeft: 1,
}));

const UserPerDay: React.FC = () => {
  const yLabel = [
    '0h',
    '2h',
    '4h',
    '6h',
    '8h',
    '10h',
    '12h',
    '14h',
    '16h',
    '18h',
    '20h',
    '22h',
  ];
  const xLabel = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'];
  const { data, dateInterval, selectPosition } = useSelector<
    SRCWEB.ApplicationState,
    IUserPerDay
  >((state) => ({
    data: state.analytic.activeUsersDayHour,
    dateInterval: state.analytic.dateInterval,
    selectPosition: state.analytic.filterChart,
  }));
  const dispatch = useDispatch();

  const [localDateInterval, setLocalDateInterval] = React.useState<
    DateInterval
  >(dateInterval);
  const [localSelected, setLocalSelected] = React.useState<IntervalTypes>(
    selectPosition
  );
  React.useEffect(() => {
    setLocalDateInterval(dateInterval);
    setLocalSelected(selectPosition);
  }, [dateInterval, dispatch, selectPosition]);
  React.useEffect(() => {
    dispatch(activeUsersDayHour.request(localDateInterval));
  }, [localDateInterval, dispatch]);

  return (
    <Container>
      <CardSection>
        <div style={{ padding: '20px 20px 13px 20px', flex: 1 }}>
          <Title>Usuários por horário do dia</Title>
          <ChartWrapper>
            <div style={{ width: 220 }}>
              <HeatMap data={data} />
            </div>
            <YLabel>
              {yLabel.map((e) => (
                <TextLabelY key={e}>{e}</TextLabelY>
              ))}
            </YLabel>
          </ChartWrapper>

          <XLabel>
            {xLabel.map((item, index) => (
              <TextLabelX key={item}>{item}</TextLabelX>
            ))}
          </XLabel>
        </div>
        <DetailInfo>
          <AnalyticsDatePicker
            selected={localSelected}
            setSelected={setLocalSelected}
            onChange={setLocalDateInterval}
            values={localDateInterval}
          />
        </DetailInfo>
      </CardSection>
    </Container>
  );
};

export default UserPerDay;
