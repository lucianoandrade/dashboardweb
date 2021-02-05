import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AnalyticsDatePicker from '../../../components/AnalyticsDatePicker';
import { dashboardTop10Negociacoes } from '../../../store/ducks/analytic/actions';
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

interface IMostTraded {
  data: Array<AnalyticGQL.IDashboardTop10NegociacoesObj>;
  selectPosition: IntervalTypes;
  dateInterval: DateInterval;
}

const MostTraded: React.FC = () => {
  const { data, dateInterval, selectPosition } = useSelector<
    SRCWEB.ApplicationState,
    IMostTraded
  >((state) => ({
    data: state.analytic.dashboardTop10Negociacoes,
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
    dispatch(dashboardTop10Negociacoes.request(localDateInterval));
  }, [localDateInterval, dispatch]);
  return (
    <Wrapper>
      <Content>
        <Title>Mais Negociados</Title>
        <Table>
          <TableRow type='title' line={0}>
            <Subtitle type='title' align='left'>
              Descrição
            </Subtitle>
            <Subtitle>Parcelamento</Subtitle>
            <Subtitle>Quantidade</Subtitle>
            <Subtitle>Valor</Subtitle>
          </TableRow>
          {Array.isArray(data) &&
            data.map((item, index) => (
              <TableRow type='line' line={index + 1}>
                <Subtitle display='none' type='title' align='left'>
                  {`${item.credor} ${item.faixa}`}
                </Subtitle>
                <Subtitle display='none'>{` ${item.plano}x`}</Subtitle>
                <Subtitle display='none'>{` ${item.quantidade}`}</Subtitle>
                <Subtitle display='none'>
                  R$
                  {item.valor?.toLocaleString('pt-br', {
                    minimumFractionDigits: 2,
                  })}
                </Subtitle>
                <Mobile>
                  <Subtitle>{`${item.credor} ${item.faixa}`}</Subtitle>
                  <Subtitle>
                    <p className='bold'>{'Parcelamento: '}</p>
                    <p>{`${item.plano}x`}</p>
                  </Subtitle>
                </Mobile>
                <Mobile>
                  <Subtitle align='end'>
                    <span className='strong'>{item.quantidade}</span>
                  </Subtitle>
                  <Subtitle align='end'>
                    <p className='bold'>Valor:</p>
                    <p>
                      R$
                      {item.valor?.toLocaleString('pt-br', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
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

export default MostTraded;
