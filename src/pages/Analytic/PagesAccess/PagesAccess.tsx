import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AnalyticsDatePicker from '../../../components/AnalyticsDatePicker';
import { pageMostAccess } from '../../../store/ducks/analytic/actions';
import { Content, Detail, Table, TableRow, Title, Wrapper } from './styles';

interface IPageAccess {
  data: Array<AnalyticGQL.ITopTenByAccessModel>;
  selectPosition: IntervalTypes;
  dateInterval: DateInterval;
}

const PagesAccess: React.FC = () => {
  const { data, dateInterval, selectPosition } = useSelector<
    SRCWEB.ApplicationState,
    IPageAccess
  >((state) => ({
    data: state.analytic.pagesMostAccess,
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
    dispatch(pageMostAccess.request(localDateInterval));
  }, [localDateInterval, dispatch]);

  return (
    <Wrapper>
      <Content>
        <Title>Páginas mais acessadas</Title>
        <Table>
          <TableRow type='title' line={0}>
            <div>Página</div>
            <div>Exibições de página</div>
          </TableRow>
          {data.map((item, index) => (
            <TableRow type='line' line={index + 1}>
              <div>{item.action}</div>
              <div className='subtitle'>{item.displayQuantity}</div>
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
        <Link to='/maisacessadas' style={{ textDecoration: 'none' }}>
          <div className='detail'>
            {'Mais detalhes '}
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </Link>
      </Detail>
    </Wrapper>
  );
};

export default PagesAccess;
