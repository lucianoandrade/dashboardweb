import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AnalyticsDatePicker from '../../../components/AnalyticsDatePicker';
import { dashboardTop10OrigemCampanha } from '../../../store/ducks/analytic/actions';
import { Content, Detail, Table, TableRow, Title, Wrapper } from './styles';

interface IOrigemCampanha {
  data: Array<AnalyticGQL.IDashboardTop10OrigemCampanha>;
  selectPosition: IntervalTypes;
  dateInterval: DateInterval;
}

const OriginCampaign: React.FC = () => {
  const { data, dateInterval, selectPosition } = useSelector<
    SRCWEB.ApplicationState,
    IOrigemCampanha
  >((state) => ({
    data: state.analytic.dashboardTop10OrigemCampanha,
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
    dispatch(dashboardTop10OrigemCampanha.request(localDateInterval));
  }, [localDateInterval, dispatch]);
  return (
    <Wrapper>
      <Content>
        <Title>Origem do acesso e campanhas</Title>
        <Table>
          <TableRow type='title' line={0}>
            <div>Origem / Campanha</div>
            <div>Qtd. Acessos</div>
          </TableRow>
          {data.map((item, index) => (
            <TableRow type='line' line={index + 1}>
              <div>{item.url_entrada}</div>
              <div className='subtitle'>{item.qtd}</div>
            </TableRow>
          ))}
        </Table>
      </Content>
      <Detail>
        <AnalyticsDatePicker
          selected={localSelected}
          setSelected={setLocalSelected}
          onChange={setLocalDateInterval}
          values={localDateInterval}
        />
        <Link to='/origemcampanha' style={{ textDecoration: 'none' }}>
          <div className='detail'>
            {'Mais detalhes '}
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </Link>
      </Detail>
    </Wrapper>
  );
};

export default OriginCampaign;
