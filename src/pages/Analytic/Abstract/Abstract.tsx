import {
  faChevronRight,
  faLongArrowAltDown,
  faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnalyticsDatePicker from '../../../components/AnalyticsDatePicker';
import DashLineChart from '../../../components/charts/LineChart/DashLineChart';
import {
  Button,
  ButtonsContainer,
  ChartContainer,
  DetailInfo,
  Loading,
  Tab,
  Tabs,
  Wrapper,
} from './styles';
import { resumoGrafico } from '../../../store/ducks/analytic/actions';

interface IAbstract {
  resumoUsuariosLogados: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoAcordos: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoPropostas: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoSessions: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoBoletos: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoPagamentos: Array<AnalyticGQL.IDashboardResumoComHora>;
  dashboardResumo: Array<AnalyticGQL.IDashboardResumo>;
  loading: boolean;
  selectPosition: IntervalTypes;
  dateInterval: DateInterval;
}

const Abstract: React.FC = () => {
  const [selected, setSelected] = useState('usuarios');
  const [dash, setDash] = useState<IHandleData[]>([]);
  const [dashBackup, setDashBackup] = useState<IHandleData[]>([]);
  const [btnSelected, setBtnSelected] = useState('quantidade');
  const {
    resumoUsuariosLogados,
    resumoSessions,
    resumoGraficoBoletos,
    resumoGraficoPagamentos,
    resumoGraficoAcordos,
    resumoGraficoPropostas,
    dashboardResumo,
    loading,
    selectPosition,
    dateInterval,
  } = useSelector<SRCWEB.ApplicationState, IAbstract>((state) => ({
    dashboardResumo: state.analytic.dashboardResumo,
    resumoUsuariosLogados: state.analytic.resumoUsuariosLogados,
    resumoSessions: state.analytic.resumoSessions,
    resumoGraficoBoletos: state.analytic.resumoGraficoBoletos,
    resumoGraficoPagamentos: state.analytic.resumoGraficoPagamentos,
    resumoGraficoAcordos: state.analytic.resumoGraficoAcordos,
    resumoGraficoPropostas: state.analytic.resumoGraficoPropostas,
    loading: state.analytic.loading,
    selectPosition: state.analytic.filterChart,
    dateInterval: state.analytic.dateInterval,
  }));
  const dispatch = useDispatch();

  const [localDateInterval, setLocalDateInterval] = useState<DateInterval>(
    dateInterval
  );
  const [localSelected, setLocalSelected] = useState<IntervalTypes>(
    selectPosition
  );
  useEffect(() => {
    setLocalDateInterval(dateInterval);
    setLocalSelected(selectPosition);
  }, [dateInterval, dispatch, selectPosition]);
  useEffect(() => {
    dispatch(resumoGrafico.request(localDateInterval));
  }, [localDateInterval, dispatch]);

  const handleData = (data: AnalyticGQL.IDashboardResumoComHora[]) => {
    const prepareData: IHandleData[] = data.map((position) => ({
      type: position.tipoIndicador,
      values: position.valores.map((element) => element.valor),
      times: position.valores.map((element) => {
        if (element.hora) {
          return element.hora;
        }
        if (element.dia) {
          return element.dia.slice(0, 2);
        }
        return null;
      }),
    }));
    setDash(prepareData);
    setDashBackup(prepareData);
  };

  const handleChange = React.useCallback(
    (value: string) => {
      switch (value) {
        case 'usuarios':
          handleData(resumoUsuariosLogados);
          break;
        case 'sessoes':
          handleData(resumoSessions);
          break;
        case 'pagamentos':
          handleData(resumoGraficoPagamentos);
          break;
        case 'boletos':
          handleData(resumoGraficoBoletos);
          break;
        case 'proposta':
          handleData(resumoGraficoPropostas);
          break;
        case 'acordos':
          handleData(resumoGraficoAcordos);
          break;
        default:
          handleData(resumoUsuariosLogados);
      }
    },
    [
      resumoGraficoAcordos,
      resumoGraficoBoletos,
      resumoGraficoPagamentos,
      resumoGraficoPropostas,
      resumoSessions,
      resumoUsuariosLogados,
    ]
  );

  useEffect(() => {
    handleChange(selected);
  }, [
    resumoUsuariosLogados,
    resumoSessions,
    resumoGraficoBoletos,
    resumoGraficoPagamentos,
    resumoGraficoAcordos,
    resumoGraficoPropostas,
    selected,
    handleChange,
  ]);

  const handleChangeButton = (value: string) => {
    setBtnSelected(value);
    if (value === 'valor') {
      setDash(dashBackup.slice(Math.max(dashBackup.length - 2, 1)));
    } else {
      setDash(dashBackup.slice(0, 2));
    }
  };

  const valorDoDashBoard = (data: AnalyticGQL.IDashboardResumo | undefined) => {
    if (!data) return null;
    let valor = (data && data.valor ? data.valor : 0).toString();
    if (data.valor > 999) {
      valor = valor.toString();
      valor = `${valor.slice(0, -3)}k`;
    } else if (data.valor > 999999) {
      valor = valor.toString();
      valor = `${valor.slice(0, -6)}M`;
    }
    return (
      <div className='info'>
        {(data?.tipoIndicador?.includes('Valor') ? `R${valor}` : `${valor}`) ||
          '0'}
        {(data?.variacao as number) > 0 && (
          <span className='green'>
            <FontAwesomeIcon icon={faLongArrowAltUp} />
            {`${data?.variacao?.toFixed(1)}%`}
          </span>
        )}
        {(data?.variacao as number) < 0 && (
          <span className='red'>
            <FontAwesomeIcon icon={faLongArrowAltDown} />
            {`${data && data?.variacao?.toFixed(1)}%`}
          </span>
        )}
        {data?.variacao === 0 && <span className='green'>{`${0}%`}</span>}
      </div>
    );
  };

  return (
    <Wrapper>
      <Tabs>
        <Tab
          selected={selected === 'usuarios'}
          onClick={() => setSelected('usuarios')}
        >
          <div className='title'>Usuários</div>
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'QtdLogins')
          )}
        </Tab>
        <Tab
          selected={selected === 'proposta'}
          onClick={() => setSelected('proposta')}
        >
          <div className='title'>Propostas</div>
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'ValorNegociacoes')
          )}
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'QtdNegociacoes')
          )}
        </Tab>
        <Tab
          selected={selected === 'acordos'}
          onClick={() => setSelected('acordos')}
        >
          <div className='title'>Acordos</div>
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'ValorAcordos')
          )}
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'QtdAcordos')
          )}
        </Tab>
        <Tab
          selected={selected === 'boletos'}
          onClick={() => setSelected('boletos')}
        >
          <div className='title'>Boletos</div>
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'ValorBoletos')
          )}
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'QtdBoletos')
          )}
        </Tab>
        <Tab
          selected={selected === 'pagamentos'}
          onClick={() => setSelected('pagamentos')}
        >
          <div className='title'>Pagamentos</div>
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'ValorPagamentos')
          )}
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'QtdPagamentos')
          )}
        </Tab>
        <Tab
          selected={selected === 'sessoes'}
          onClick={() => setSelected('sessoes')}
        >
          <div className='title'>Sessões</div>
          {valorDoDashBoard(
            dashboardResumo?.find((e) => e.tipoIndicador === 'QtdSessoes')
          )}
        </Tab>
      </Tabs>

      <ChartContainer>
        {!loading ? (
          <>
            {(selected === 'boletos' ||
              selected === 'pagamentos' ||
              selected === 'acordos' ||
              selected === 'proposta') && (
              <ButtonsContainer>
                <Button
                  selected={btnSelected === 'valor'}
                  onClick={() => handleChangeButton('valor')}
                >
                  Valor
                </Button>
                <Button
                  selected={btnSelected === 'quantidade'}
                  onClick={() => handleChangeButton('quantidade')}
                >
                  Quantidade
                </Button>
              </ButtonsContainer>
            )}
            <DashLineChart data={dash} />
          </>
        ) : (
          <Loading>
            <CircularProgress />
          </Loading>
        )}
      </ChartContainer>
      <DetailInfo>
        <AnalyticsDatePicker
          selected={localSelected}
          setSelected={setLocalSelected}
          onChange={setLocalDateInterval}
          values={localDateInterval}
        />
        {/* <Link to='/maisacessadas' style={{ textDecoration: 'none' }}> */}
        <div className='detail'>
          {'Mais detalhes '}
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        {/* </Link> */}
      </DetailInfo>
    </Wrapper>
  );
};

export default Abstract;
