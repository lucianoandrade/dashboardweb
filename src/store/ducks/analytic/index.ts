import moment from 'moment';
import { createReducer } from 'typesafe-actions';
import { persistRehydrate } from '../chat/actions';
import {
  activeUsersDayHour,
  activeUsersNow,
  dashboardDesistencias,
  dashboardTop10Negociacoes,
  dashboardTop10OrigemCampanha,
  detailActiveNowAction,
  detailOriginCampaignAction,
  dispositivoUtilizado,
  dashboardDispositivos,
  handleLoading,
  pageMostAccess,
  resumoGrafico,
  selectFilter,
  setDateInterval,
} from './actions';

const INIT_STATE: AnalyticState = {
  isCounting: false,
  shouldLogout: false,
  start: new Date(),
  dateInterval: {
    start: moment().subtract(1, 'month'),
    end: moment(),
  },
  activeUsersDayHour: [],
  activeUsersNow: [],
  selectedDate: '',
  pagesMostAccess: [],
  notFound: '',
  resumoUsuariosLogados: [],
  resumoGraficoAcordos: [],
  resumoGraficoPropostas: [],
  resumoSessions: [],
  resumoGraficoBoletos: [],
  resumoGraficoPagamentos: [],
  dashboardResumo: [],
  dispositivosUtilizados: [],
  filterChart: 'day',
  loading: false,
  dashboardTop10Negociacoes: [],
  dashboardDesistencias: [],
  dashboardTop10OrigemCampanha: [],
  detailActiveNow: [],
  dashboardDispositivosUtilizados: []
};

const AnalyticReducer = createReducer(INIT_STATE)
  .handleAction(activeUsersNow.success, (state, action) => ({
    ...state,
    activeUsersNow: action.payload,
  }))
  .handleAction(activeUsersNow.failure, (state, action) => ({
    ...state,
    notFound: action.payload,
  }))
  .handleAction(activeUsersDayHour.success, (state, action) => ({
    ...state,
    activeUsersDayHour: action.payload,
  }))
  .handleAction(activeUsersDayHour.failure, (state, action) => ({
    ...state,
    notFound: action.payload,
  }))
  .handleAction(pageMostAccess.success, (state, action) => ({
    ...state,
    pagesMostAccess: action.payload,
  }))
  .handleAction(pageMostAccess.failure, (state, action) => ({
    ...state,
    notFound: action.payload,
  }))
  .handleAction(dispositivoUtilizado.success, (state, action) => ({
    ...state,
    dispositivosUtilizados: action.payload,
  }))
  .handleAction(dispositivoUtilizado.failure, (state, action) => ({
    ...state,
    notFound: action.payload,
  }))
  .handleAction(dashboardDispositivos.success, (state, action) => ({
    ...state,
    dashboardDispositivosUtilizados: action.payload,
  }))
  .handleAction(dashboardDispositivos.failure, (state, action) => ({
    ...state,
    notFound: action.payload,
  }))
  .handleAction(resumoGrafico.success, (state, action) => ({
    ...state,
    resumoUsuariosLogados: action.payload.resumoUsuariosLogados,
    resumoSessions: action.payload.resumoSessions,
    resumoGraficoBoletos: action.payload.resumoGraficoBoletos,
    resumoGraficoPagamentos: action.payload.resumoGraficoPagamentos,
    resumoGraficoAcordos: action.payload.resumoGraficoAcordos,
    resumoGraficoPropostas: action.payload.resumoGraficoPropostas,
    dashboardResumo: action.payload.dashboardResumo,
    loading: action.payload.loading,
  }))
  .handleAction(selectFilter, (state, action) => ({
    ...state,
    filterChart: action.payload,
  }))
  .handleAction(handleLoading, (state, action) => ({
    ...state,
    loading: action.payload,
  }))
  .handleAction(setDateInterval, (state, action) => ({
    ...state,
    dateInterval: action.payload,
  }))
  .handleAction(persistRehydrate, (state, action) => ({
    ...state,
    ...action.payload?.analytic,
    dateInterval: {
      start: moment(action.payload?.analytic?.dateInterval?.start),
      end: moment(action.payload?.analytic?.dateInterval?.end),
    },
  }))
  .handleAction(dashboardTop10Negociacoes.success, (state, action) => ({
    ...state,
    dashboardTop10Negociacoes: action.payload,
  }))
  .handleAction(dashboardDesistencias.success, (state, action) => ({
    ...state,
    dashboardDesistencias: action.payload,
  }))
  .handleAction(dashboardTop10OrigemCampanha.success, (state, action) => ({
    ...state,
    dashboardTop10OrigemCampanha: action.payload,
  }))
  .handleAction(detailOriginCampaignAction.success, (state, action) => ({
    ...state,
    dashboardOriginCampaign: action.payload,
  }))
  .handleAction(detailActiveNowAction.success, (state, action) => ({
    ...state,
    detailActiveNow: action.payload,
  }))
  .handleAction(detailActiveNowAction.failure, (state, action) => ({
    ...state,
    detailActiveNow: [],
  }));
export default AnalyticReducer;
