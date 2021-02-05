import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AnalyticsDatePicker from '../../../components/AnalyticsDatePicker';
import { dashboardDesistencias } from '../../../store/ducks/analytic/actions';
import {
  Content,
  Detail,
  Mobile,
  Subtitle,
  Table,
  TableRow,
  Title,
  Wrapper,
} from './styles';

interface IDropouts {
  data: Array<AnalyticGQL.IDashboardDesistencia>;
  selectPosition: IntervalTypes;
  dateInterval: DateInterval;
}

const Dropouts: React.FC = () => {
  const { data, dateInterval, selectPosition } = useSelector<
    SRCWEB.ApplicationState,
    IDropouts
  >((state) => ({
    data: state.analytic.dashboardDesistencias,
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
    dispatch(dashboardDesistencias.request(localDateInterval));
  }, [localDateInterval, dispatch]);
  return (
    <Wrapper>
      <Content>
        <Title>Desistências</Title>
        <Table>
          <TableRow type='title' line={0}>
            <div style={{ width: '41%' }}>Descrição</div>
            <div>Tipo</div>
            <div>Qtd. Ocorrências</div>
          </TableRow>
          {data.map((item, index) => (
            <TableRow type='line' line={index + 1}>
              <Subtitle display='none' align='left'>
                {`${item.credor} ${item.faixa}`}
              </Subtitle>
              <Subtitle display='none'>{item.tipoNegociacao}</Subtitle>
              <Subtitle display='none' type='title'>
                {`${item.quantidade} `}
                <span className='percentage'>
                  {`| ${Math.round(item.percentual ? item.percentual : 0)}%`}
                </span>
              </Subtitle>
              <Mobile>
                <Subtitle>{`${item.credor} ${item.faixa}`}</Subtitle>
                <Subtitle>
                  <p className='bold'>
                    Tipo:
                    <span className='light'>{` ${item.tipoNegociacao}`}</span>
                  </p>
                </Subtitle>
              </Mobile>
              <Mobile>
                <Subtitle type='end'>
                  <span className='bold'>
                    {`${item.quantidade} `}
                    <span className='percentage'>
                      {`| ${Math.round(
                        item.percentual ? item.percentual : 0
                      )}%`}
                    </span>
                  </span>
                </Subtitle>
              </Mobile>
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
        <Link to='/desistencias' style={{ textDecoration: 'none' }}>
          <div className='detail'>
            {'Mais detalhes '}
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </Link>
      </Detail>
    </Wrapper>
  );
};

export default Dropouts;
