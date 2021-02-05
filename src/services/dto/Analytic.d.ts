// tslint:disable
// graphql typescript definitions

declare namespace AnalyticGQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    getHello: string;
    testQuery: string | null;
    getTopTenByAccess: Array<ITopTenByAccessModel>;
    dashboardResumo: Array<IDashboardResumo>;
    ativosAgora: Array<IDashboardAtivos>;
    usuariosPorDiaDaSemanaEHora: Array<IUsuariosPorDiaDaSemanaEHoraModel>;
    resumoGraficoPropostas: Array<IDashboardResumoComHora>;
    resumoGraficoAcordos: Array<IDashboardResumoComHora>;
    resumoUsuariosLogados: Array<IDashboardResumoComHora>;
    resumoSessions: Array<IDashboardResumoComHora>;
    resumoGraficoBoletos: Array<IDashboardResumoComHora>;
    resumoGraficoPagamentos: Array<IDashboardResumoComHora>;
    dashboardDesistencias: Array<IDashboardDesistencia>;
    dispositivosUtilizados: Array<IDashboardDipositivosUtilizados>;
    dashboardTop10Negociacoes: Array<IDashboardTop10NegociacoesObj>;
    dashboardMaisAcessados: IDashboardMaisAcessados;
    dashboardOrigemCampanha: IDashboardOrigemCampanha;
    dashboardMaisNegociados: IDashboardNegociadas;
    dashboardDetalhamentoDispositivosUtilizados: IDashboardDetalhamentoDispositivosUtilizadosDTO;
    dashboardOrigemCampanhaDetalhes: Array<IDashboardOrigemCampanhaDetalhes>;
    dashboardMaisNegociadosDetalhes: Array<IDashboardDetalhamentoNegociadas>;
    dashboardTop10OrigemCampanha: Array<IDashboardTop10OrigemCampanha>;
    detailActiveNow: Array<IDetailActiveNowHour>;
  }

  interface IGetTopTenByAccessOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardResumoOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IUsuariosPorDiaDaSemanaEHoraOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IResumoGraficoPropostasOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IResumoGraficoAcordosOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IResumoUsuariosLogadosOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IResumoSessionsOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IResumoGraficoBoletosOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IResumoGraficoPagamentosOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardDesistenciasOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDispositivosUtilizadosOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardTop10NegociacoesOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardMaisAcessadosOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardOrigemCampanhaOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardMaisNegociadosOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardDetalhamentoDispositivosUtilizadosOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardOrigemCampanhaDetalhesOnQueryArguments {
    page: number;
    url_entrada: string;
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardMaisNegociadosDetalhesOnQueryArguments {
    page: number;
    parcelamento: number;
    maximoAtraso: number;
    minimoAtraso: number;
    credor: string;
    finalDate: string;
    initialDate: string;
  }

  interface IDashboardTop10OrigemCampanhaOnQueryArguments {
    finalDate: string;
    initialDate: string;
  }

  interface IDetailActiveNowOnQueryArguments {
    page: number;
  }

  interface ITopTenByAccessModel {
    __typename: 'TopTenByAccessModel';
    action: string;
    displayQuantity: number;
  }

  interface IDashboardResumo {
    __typename: 'DashboardResumo';
    tipoIndicador: string;
    valor: number;
    variacao: number | null;
  }

  interface IDashboardAtivos {
    __typename: 'DashboardAtivos';
    indicador: string;
    values: Array<IDashboardAtivosValues>;
  }

  interface IDashboardAtivosValues {
    __typename: 'DashboardAtivosValues';
    acao: string | null;
    valor: number | null;
    hora: number | null;
    minuto: number | null;
  }

  interface IUsuariosPorDiaDaSemanaEHoraModel {
    __typename: 'UsuariosPorDiaDaSemanaEHoraModel';
    diaDaSemana: WeekDay;
    horas: Array<IHours>;
  }

  const enum WeekDay {
    Domingo = 'Domingo',
    Segunda = 'Segunda',
    Terca = 'Terca',
    Quarta = 'Quarta',
    Quinta = 'Quinta',
    Sexta = 'Sexta',
    Sabado = 'Sabado',
  }

  interface IHours {
    __typename: 'Hours';
    valor: number | null;
    hora: string | null;
    dia: string | null;
  }

  interface IDashboardResumoComHora {
    __typename: 'DashboardResumoComHora';
    tipoIndicador: string;
    valores: Array<IHours>;
  }

  interface IDashboardDesistencia {
    __typename: 'DashboardDesistencia';
    quantidade: number | null;
    tipoNegociacao: string | null;
    credor: string | null;
    faixa: string | null;
    percentual: number | null;
  }

  interface IDashboardDipositivosUtilizados {
    __typename: 'DashboardDipositivosUtilizados';
    tipoIndicador: string;
    valor: number;
    variacao: number;
  }

  interface IDashboardTop10NegociacoesObj {
    __typename: 'DashboardTop10NegociacoesObj';
    quantidade: number | null;
    tipoNegociacao: string | null;
    credor: string | null;
    faixa: string | null;
    valor: number | null;
    plano: number | null;
  }

  interface IDashboardMaisAcessados {
    __typename: 'DashboardMaisAcessados';
    porHora: Array<IDashboardMaisAcessadosPorHora> | null;
    porData: Array<IDashboardMaisAcessadosPorData> | null;
  }

  interface IDashboardMaisAcessadosPorHora {
    __typename: 'DashboardMaisAcessadosPorHora';
    acao: string | null;
    hora: string | null;
    qtd: number | null;
  }

  interface IDashboardMaisAcessadosPorData {
    __typename: 'DashboardMaisAcessadosPorData';
    acao: string | null;
    data: string | null;
    qtd: number | null;
  }

  interface IDashboardOrigemCampanha {
    __typename: 'DashboardOrigemCampanha';
    granulado: Array<IDashboardOrigemCampanhaGranulado> | null;
    consolidado: Array<IDashboardOrigemCampanhaPorDataConsolidado> | null;
  }

  interface IDashboardOrigemCampanhaGranulado {
    __typename: 'DashboardOrigemCampanhaGranulado';
    identificador: string | null;
    valores: Array<IDadosDeGrafico> | null;
  }

  interface IDadosDeGrafico {
    __typename: 'DadosDeGrafico';
    chave: string | null;
    valor: string | null;
  }

  interface IDashboardOrigemCampanhaPorDataConsolidado {
    __typename: 'DashboardOrigemCampanhaPorDataConsolidado';
    urlEntrada: string | null;
    qtdAcessos: number | null;
    qtdNegociacoes: number | null;
    vlrNegociacoes: number | null;
    qtdBoletos: number | null;
    vlrBoletos: number | null;
    qtdPix: number | null;
    vlrPix: number | null;
  }

  interface IDashboardNegociadas {
    __typename: 'DashboardNegociadas';
    porHora: Array<IDashboardNegociadasHora> | null;
    porData: Array<IDashboardNegociadasData> | null;
    lista: Array<IDashboardNegociadasLista> | null;
  }

  interface IDashboardNegociadasHora {
    __typename: 'DashboardNegociadasHora';
    array: Array<IDashboardNegociadasAR> | null;
    descricao: string | null;
  }

  interface IDashboardNegociadasAR {
    __typename: 'DashboardNegociadasAR';
    valor: string | null;
    chave: string | null;
  }

  interface IDashboardNegociadasData {
    __typename: 'DashboardNegociadasData';
    array: Array<IDashboardNegociadasAR> | null;
    descricao: string | null;
  }

  interface IDashboardNegociadasLista {
    __typename: 'DashboardNegociadasLista';
    quantidade: number | null;
    credor: string | null;
    faixa: string | null;
    valor: number | null;
    parcelamento: number | null;
  }

  interface IDashboardDetalhamentoDispositivosUtilizadosDTO {
    __typename: 'DashboardDetalhamentoDispositivosUtilizadosDTO';
    dispositivosUtilizados: IDashboardsDetalhesDispositivosUtilizados | null;
    navegadoresUtilizados: Array<IDashboardsDetalhesNavegadores> | null;
  }

  interface IDashboardsDetalhesDispositivosUtilizados {
    __typename: 'DashboardsDetalhesDispositivosUtilizados';
    porHora: Array<IDashboardsDetalhesDispositivos> | null;
    porData: Array<IDashboardsDetalhesDispositivos> | null;
  }

  interface IDashboardsDetalhesDispositivos {
    __typename: 'DashboardsDetalhesDispositivos';
    identificador: string | null;
    array: Array<IDashboardsDetalhesDispositivosData> | null;
  }

  interface IDashboardsDetalhesDispositivosData {
    __typename: 'DashboardsDetalhesDispositivosData';
    chave: string | null;
    valor: number | null;
  }

  interface IDashboardsDetalhesNavegadores {
    __typename: 'DashboardsDetalhesNavegadores';
    chave: string | null;
    valor: number | null;
  }

  interface IDashboardOrigemCampanhaDetalhes {
    __typename: 'DashboardOrigemCampanhaDetalhes';
    cpf: string | null;
    data: string | null;
    vlr_negociado: number | null;
    qtd_negociacoes: number | null;
    qtd_boletos: number | null;
    vlr_boletos: number | null;
    qtd_pix: number | null;
    vlr_pix: number | null;
    qtd_acessos: number | null;
    dt_ult_acesso: any | null;
  }

  interface IDashboardDetalhamentoNegociadas {
    __typename: 'DashboardDetalhamentoNegociadas';
    cpf: string | null;
    data: string | null;
    valor: number | null;
    parcelamento: number | null;
    dt_ult_acesso: string | null;
  }

  interface IDashboardTop10OrigemCampanha {
    __typename: 'DashboardTop10OrigemCampanha';
    url_entrada: string | null;
    qtd: number | null;
  }

  interface IDetailActiveNowHour {
    __typename: 'DetailActiveNowHour';
    indicador: string;
    values: Array<IDetailActiveNow>;
  }

  interface IDetailActiveNow {
    __typename: 'DetailActiveNow';
    acao: string | null;
    creditor: string | null;
    hora: number | null;
    valor: number | null;
    minuto: number | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    setPayment: string | null;
    setNavigation: string | null;
    setNegotiation: string | null;
  }

  interface ISetPaymentOnMutationArguments {
    options: IPaymentInput;
  }

  interface ISetNavigationOnMutationArguments {
    options: INavigationInput;
  }

  interface ISetNegotiationOnMutationArguments {
    negotiation: IInsertNegotiationModel;
  }

  interface IPaymentInput {
    paymentType: number;
    billetType: number;
    creditor: string;
    portion: number;
    plan: number;
    value: number;
    dueDate: any;
  }

  interface INavigationInput {
    action: string;
    creditor?: string | null;
    dealType?: number | null;
    plan?: number | null;
    dealValue?: number | null;
    delay?: number | null;
  }

  interface IInsertNegotiationModel {
    creditor: string;
    dealType: number;
    plan: number;
    dealValue: number;
    delay: number;
  }
}

// tslint:enable

