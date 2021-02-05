declare interface AnalyticState {
  activeUsersDayHour: Array<AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraModel>;
  activeUsersNow: Array<AnalyticGQL.IDashboardAtivos>;
  detailActiveNow: Array<AnalyticGQL.IDetailActiveNowHour>;
  isCounting: boolean;
  shouldLogout: boolean;
  start: Date;
  dateInterval: DateInterval;
  selectedDate: string /* DD/MM/YYYY */;
  notFound: string;
  pagesMostAccess: Array<AnalyticGQL.ITopTenByAccessModel>;
  resumoUsuariosLogados: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoAcordos: any;
  resumoGraficoPropostas: any;
  resumoSessions: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoBoletos: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoPagamentos: Array<AnalyticGQL.IDashboardResumoComHora>;
  dashboardResumo: Array<AnalyticGQL.IDashboardResumo>;
  dispositivosUtilizados: Array<AnalyticGQL.IDispositivosUtilizados>;
  dashboardDispositivosUtilizados: Array<AnalyticGQL.IDashboardDetalhamentoDispositivosUtilizadosDTO>;
  filterChart: IntervalTypes;
  loading: boolean;
  dashboardTop10Negociacoes: Array<AnalyticGQL.IDashboardTop10NegociacoesObj>;
  dashboardDesistencias: Array<AnalyticGQL.IDashboardDesistencia>;
  dashboardTop10OrigemCampanha: Array<
    AnalyticGQL.IDashboardTop10OrigemCampanha
  >;
  dashboardOriginCampaign?: AnalyticGQL.IDashboardOrigemCampanha;
}

interface IAbstractSuccess {
  resumoUsuariosLogados: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoAcordos?: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoPropostas?: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoSessions: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoBoletos: Array<AnalyticGQL.IDashboardResumoComHora>;
  resumoGraficoPagamentos: Array<AnalyticGQL.IDashboardResumoComHora>;
  dashboardResumo: Array<AnalyticGQL.IDashboardResumo>;
  loading: boolean;
}

declare interface IHandleData {
  type: string;
  values: Array<number | null>;
  times: Array<string | null>;
}
