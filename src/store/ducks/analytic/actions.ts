import { createAction, createAsyncAction } from 'typesafe-actions';

export const activeUsersDayHour = createAsyncAction(
  '@analytic/ACTIVE_TODAY_REQUEST',
  '@analytic/ACTIVE_TODAY_SUCCESS',
  '@analytic/ACTIVE_TODAY_FAILURE'
)<DateInterval, Array<AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraModel>, string>();

export const pageMostAccess = createAsyncAction(
  '@analytic/TOP_TEN_REQUEST',
  '@analytic/TOP_TEN_SUCCESS',
  '@analytic/TOP_TEN_FAILURE'
)<DateInterval, Array<AnalyticGQL.ITopTenByAccessModel>, string>();

export const dispositivoUtilizado = createAsyncAction(
  '@analytic/DISPOSITIVOS_REQUEST',
  '@analytic/DISPOSITIVOS_SUCCESS',
  '@analytic/DISPOSITIVOS_FAILURE'
)<DateInterval, Array<AnalyticGQL.IDashboardDipositivosUtilizados>, string>();

export const dashboardDispositivos = createAsyncAction(
  '@analytic/DASHBOARD_DISPOSITIVO_REQUEST',
  '@analytic/DASHBOARD_DISPOSITIVO_SUCCESS',
  '@analytic/DASHBOARD_DISPOSITIVO_FAILURE'
)<DateInterval, Array<AnalyticGQL.IDashboardDetalhamentoDispositivosUtilizadosDTO>, string>();

export const activeUsersNow = createAsyncAction(
  '@analytic/ACTIVE_REQUEST',
  '@analytic/ACTIVE_SUCCESS',
  '@analytic/ACTIVE_FAILURE'
)<undefined, Array<AnalyticGQL.IDashboardAtivos>, string>();

export const resumoGrafico = createAsyncAction(
  '@analytic/RESUMO_REQUEST',
  '@analytic/RESUMO_SUCCESS',
  '@analytic/RESUMO_FAILURE'
)<DateInterval, IAbstractSuccess, string>();

export const dashboardTop10Negociacoes = createAsyncAction(
  '@analytic/TOPTEN_REQUEST',
  '@analytic/TOPTEN_SUCCESS',
  '@analytic/TOPTEN_FAILURE'
)<DateInterval, Array<AnalyticGQL.IDashboardTop10NegociacoesObj>, string>();

export const dashboardDesistencias = createAsyncAction(
  '@analytic/DESISTENCIA_REQUEST',
  '@analytic/DESISTENCIA_SUCCESS',
  '@analytic/DESISTENCIA_FAILURE'
)<DateInterval, Array<AnalyticGQL.IDashboardDesistencia>, string>();

export const dashboardTop10OrigemCampanha = createAsyncAction(
  '@analytic/ORIGEM_CAMPANHA_REQUEST',
  '@analytic/ORIGEM_CAMPANHA_SUCCESS',
  '@analytic/ORIGEM_CAMPANHA_FAILURE'
)<DateInterval, Array<AnalyticGQL.IDashboardTop10OrigemCampanha>, string>();

export const detailActiveNowAction = createAsyncAction(
  '@analytic/DETAIL_ACTIVE_NOW_REQUEST',
  '@analytic/DETAIL_ACTIVE_NOW_SUCCESS',
  '@analytic/DETAIL_ACTIVE_NOW_FAILURE'
)<number, Array<AnalyticGQL.IDetailActiveNowHour>, string>();

export const detailOriginCampaignAction = createAsyncAction(
  '@analytic/DETAIL_ORIGIN_CAMPAIGN_REQUEST',
  '@analytic/DETAIL_ORIGIN_CAMPAIGN_SUCCESS',
  '@analytic/DETAIL_ORIGIN_CAMPAIGN_FAILURE'
)<DateInterval, AnalyticGQL.IDashboardOrigemCampanha, string>();

export const selectFilter = createAction('@filter')<IntervalTypes>();
export const handleLoading = createAction('@loading')<boolean>();
export const setDateInterval = createAction('@analytic/set_date_interval')<
  DateInterval
>();
