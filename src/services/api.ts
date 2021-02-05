/* eslint-disable camelcase */
import Axios, { AxiosInstance } from 'axios';
import md5 from 'md5';
import moment from 'moment';
import qs from 'querystring';
import { b64toBlob } from '../util/b64toBlob';
import { getDatesAndValuesBetweenTwoDates } from '../util/getDatesAndValuesBetweenTwoDates';
import { LoginDTO } from './dto/Login';

const srcWebApiUrl = window.env.SRCWEBAPI || process.env.REACT_APP_SRCWEBAPI;

class API {
  private srcWebApi: AxiosInstance;

  private licenseApi: AxiosInstance;

  private analyticApi: AxiosInstance;

  private queries = {
    getConnections: () => ({
      query: `query {
                getConnections {
                  dbName
                  number
                }
            }`,
    }),
    login: (userData: LoginDTO) => ({
      query: `query {
        login(login: "${userData.username}",
        senha: "${userData.password}",
        number: ${userData.dbId}) {
          token login name email group_name token_license
          COD_RECUP nivelGroup COD_GROUP imageB64 licenseApiUrl
        }
      }`,
    }),
    getLicenseUrl: () => ({
      query: 'query { getLicenseUrl { url } }',
    }),
    listGroup: (data: GQL.IRequestListGroupDto) => ({
      query: `
      query {
        listGroups (
          request: {
            param: "${data.param}"
            initDate: "${data.initDate}"
            endDate: "${data.endDate}"
            COD_RECUP: ${data.COD_RECUP}
            COD_GROUP: ${data.COD_GROUP}
          }
        ) {
          COD_GRUPO groupName acionamentoTotal acionamentoPositive
          promessaTotal promessaValue paymentValue percentage
          metas {
            META_QTDACIONAMENTOS${data.param.toUpperCase()}
            META_QTDACIONAMENTOSPOSITIVOS${data.param.toUpperCase()}
            META_QTDPROMESSAS${data.param.toUpperCase()}
            META_VALORPROMESSAS
            META_VALORPAGAMENTOS
            META_EFETIVIDADEACIONAMENTOS
            PISO_QTDACIONAMENTOS${data.param.toUpperCase()}
            PISO_QTDACIONAMENTOSPOSITIVOS${data.param.toUpperCase()}
            PISO_QTDPROMESSAS${data.param.toUpperCase()}
            PISO_VALORPROMESSAS
            PISO_VALORPAGAMENTOS
            PISO_EFETIVIDADEACIONAMENTOS
            SUPER_QTDACIONAMENTOS${data.param.toUpperCase()}
            SUPER_QTDACIONAMENTOSPOSITIVOS${data.param.toUpperCase()}
            SUPER_QTDPROMESSAS${data.param.toUpperCase()}
            SUPER_VALORPROMESSAS
            SUPER_VALORPAGAMENTOS
            SUPER_EFETIVIDADEACIONAMENTOS
          }
        }
      }`,
    }),
    getGroupComparison: (data: GQL.IRequestComparativeGroup) => ({
      query: `
      query {
        getComparativeGroups(
          request: {
            param: "${data.param}" initDate: "${data.initDate}"
            endDate: "${data.endDate}" COD_RECUP: ${data.COD_RECUP}
            comparativeType: "${data.comparativeType}"
          }
        ) { groupName groupArray { DATA HORA value } }
      }`,
    }),
    getListOperatorsByGroup: (data: GQL.IRequestListOperatorByGroup) => ({
      query: `
      query{
        getListOperatorsByGroup(
          request:{
            param:"${data.param}"
            initDate:"${data.initDate}"
            endDate:"${data.endDate}"
            COD_GROUP:${data.COD_GROUP}
            token_license: "${data.token_license}"
            licenseApiUrl: "${data.licenseApiUrl}"
          }
        ){ operatorName
          operatorLogin
          COD_RECUP
          urlAvatar
          isOnline
          metaAtendimento
          workTime
          pauseLimit
          pauseTime
          acionamentoTotal
          acionamentoPositive
          promessaTotal
          promessaValue
          paymentValue
          percentage
          metas {
            META_QTDACIONAMENTOS${data.param.toUpperCase()}
            META_QTDACIONAMENTOSPOSITIVOS${data.param.toUpperCase()}
            META_QTDPROMESSAS${data.param.toUpperCase()}
            META_VALORPROMESSAS
            META_VALORPAGAMENTOS
            META_EFETIVIDADEACIONAMENTOS
            PISO_QTDACIONAMENTOS${data.param.toUpperCase()}
            PISO_QTDACIONAMENTOSPOSITIVOS${data.param.toUpperCase()}
            PISO_QTDPROMESSAS${data.param.toUpperCase()}
            PISO_VALORPROMESSAS
            PISO_VALORPAGAMENTOS
            PISO_EFETIVIDADEACIONAMENTOS
            SUPER_QTDACIONAMENTOS${data.param.toUpperCase()}
            SUPER_QTDACIONAMENTOSPOSITIVOS${data.param.toUpperCase()}
            SUPER_QTDPROMESSAS${data.param.toUpperCase()}
            SUPER_VALORPROMESSAS
            SUPER_VALORPAGAMENTOS
            SUPER_EFETIVIDADEACIONAMENTOS
          }
        }
      }
      `,
    }),
    getOperatorsIds: (data: GQL.IRequestListOperatorByGroup) => ({
      query: `
      query{
        getListOperatorsByGroup(
          request:{
            param:"${data.param}"
            initDate:"${data.initDate}"
            endDate:"${data.endDate}"
            COD_GROUP:${data.COD_GROUP}
            token_license: "${data.token_license}"
          }
        ) { operatorName COD_RECUP }
      }
      `,
    }),
    getUserDetails: (data: GQL.IRequestUserDetail) => ({
      query: `
      query{
        getOperatorDetail(
          request:{
            id:${data.id}
          }
        ){
         NOME_FILIAL COD_RECUP LOGIN_RECUP TIPO_USUARIO CELULAR_RECUP HORA_ENTRADA 
         HORA_SAIDA TIPOINTERVALO_CAR EMAIL_RECUP NOME_RECUP RAMAL
        }
      }`,
    }),
    getUserName: (data: GQL.IRequestUserDetail) => ({
      query: `
      query{
        getOperatorDetail(
          request:{
            id:${data.id}
          }
        ){
          NOME_RECUP
        }
      }`,
    }),
    getUserHistory: (data: GQL.IRequestUserHistory) => ({
      query: `
      query{
        getOperatorHistory(
          request:{
            param:"${data.param}"
            COD_RECUP:${data.COD_RECUP}
            initDate:"${data.initDate}"
            endDate:"${data.endDate}"
            historyType:"${data.historyType}"
          }
        ){
          groupArray {
            DATA
            HORA
            value
          }
          metas {
            META_QTDACIONAMENTOS${data.param.toUpperCase()}
            META_QTDACIONAMENTOSPOSITIVOS${data.param.toUpperCase()}
            META_QTDPROMESSAS${data.param.toUpperCase()}
            META_VALORPROMESSAS
            META_VALORPAGAMENTOS
            META_EFETIVIDADEACIONAMENTOS
            PISO_QTDACIONAMENTOS${data.param.toUpperCase()}
            PISO_QTDACIONAMENTOSPOSITIVOS${data.param.toUpperCase()}
            PISO_QTDPROMESSAS${data.param.toUpperCase()}
            PISO_VALORPROMESSAS
            PISO_VALORPAGAMENTOS
            PISO_EFETIVIDADEACIONAMENTOS
            SUPER_QTDACIONAMENTOS${data.param.toUpperCase()}
            SUPER_QTDACIONAMENTOSPOSITIVOS${data.param.toUpperCase()}
            SUPER_QTDPROMESSAS${data.param.toUpperCase()}
            SUPER_VALORPROMESSAS
            SUPER_VALORPAGAMENTOS
            SUPER_EFETIVIDADEACIONAMENTOS
          }
        }
      }`,
    }),
    getOperatorsComparison: (data: GQL.IRequestComparativeOperatorByGroup) => {
      const responseParams: Array<keyof GQL.IOperatorComparative> = [
        'DATA',
        'HORA',
        'NOME_RECUP',
        'COD_RECUP',
        'value',
      ];
      return {
        query: `query {
          getComparativeOperatorsByGroup (
            request: {
              param: "${data.param}"
              initDate: "${data.initDate}"
              endDate: "${data.endDate}"
              COD_GROUP: ${data.COD_GROUP}
              comparativeType: "${data.comparativeType}"
            }
          ) { groupArray {${responseParams.join(' ')}} }
        }`,
      };
    },
    abstractDashboard: (data: AnalyticGQL.IDashboardResumoOnQueryArguments) => {
      return {
        query: `query {
          dashboardResumo(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            tipoIndicador,
            valor,
            variacao
          }
        }`,
      };
    },
    activeUsersNow: () => {
      return {
        query: `query {
          ativosAgora {
            indicador
            values {
              valor,
              hora,
              minuto,
              acao,
            }
          }
        }`,
      };
    },
    detailActiveUsersNow: (page: number) => ({
      query: `query {
        detailActiveNow(page: ${page}) {
          indicador
          values {
            acao creditor hora
            valor minuto
          }
        }
      }`,
    }),
    getTopTenByAccess: (data: AnalyticGQL.IDashboardResumoOnQueryArguments) => {
      return {
        query: `query {
          getTopTenByAccess (
            initialDate: "${data.initialDate}",
            finalDate: "${data.finalDate}"
          ) { 
            action
            displayQuantity
          }
        }`,
      };
    },
    usersByDayHour: (
      data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
    ) => {
      return {
        query: `query {
          usuariosPorDiaDaSemanaEHora(
            finalDate: "${data.finalDate}", 
            initialDate: "${data.initialDate}"
          ){
            horas {
              hora
              valor
            }
            diaDaSemana
          }
        }`,
      };
    },
    abstractUserChart: (
      data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
    ) => {
      return {
        query: `query {
          resumoUsuariosLogados(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            tipoIndicador,
            valores { valor, dia, hora }
          }
        }`,
      };
    },
    abstractSessions: (
      data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
    ) => {
      return {
        query: `query {
          resumoSessions(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            tipoIndicador,
            valores { valor, dia, hora }
          }
        }`,
      };
    },
    abstractPayments: (
      data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
    ) => {
      return {
        query: `query {
          resumoGraficoPagamentos(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            tipoIndicador,
            valores { valor, dia, hora }
          }
        }`,
      };
    },
    abstractChartPaper: (
      data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
    ) => {
      return {
        query: `query {
          resumoGraficoBoletos(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            tipoIndicador,
            valores { valor, dia, hora }
          }
        }`,
      };
    },
    abstractProposalChart: (
      data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
    ) => {
      return {
        query: `query {
          resumoGraficoPropostas(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            tipoIndicador,
            valores { valor, dia, hora }
          }
        }`,
      };
    },
    abstractAgreementChart: (
      data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
    ) => {
      return {
        query: `query {
          resumoGraficoAcordos(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            tipoIndicador,
            valores { valor, dia, hora }
          }
        }`,
      };
    },
    devicesUsed: (
      data: AnalyticGQL.IDispositivosUtilizadosOnQueryArguments
    ) => {
      return {
        query: `query {
          dispositivosUtilizados (initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            tipoIndicador,
            valor,
            variacao
          }
        }`,
      };
    },
    dashboardDevicesUsed: (
      data: AnalyticGQL.IDashboardDetalhamentoDispositivosUtilizadosOnQueryArguments
    ) => {
      return {
        query: `query {
          dashboardDetalhamentoDispositivosUtilizados (initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            dispositivosUtilizados {
              porHora {
                identificador, 
                array {chave, valor}
              }, 
              porData {
                identificador, 
                array {chave, valor}
              }
            },
            navegadoresUtilizados {chave, valor}
          }
        }`,
      };
    },
    dashboardTop10Negociacoes: (
      data: AnalyticGQL.IDashboardTop10NegociacoesOnQueryArguments
    ) => {
      return {
        query: `query {
          dashboardTop10Negociacoes(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
            faixa,
            quantidade,
            tipoNegociacao,
            credor,
            valor,
            plano
          }
        }`,
      };
    },
    dashboardDesistencias: (
      data: AnalyticGQL.IDashboardDesistenciasOnQueryArguments
    ) => {
      return {
        query: `query {
          dashboardDesistencias(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
          faixa
          quantidade
          percentual
          tipoNegociacao
          credor,
          faixa,
          percentual,
        }
      }`,
      };
    },

    dashboardTop10OrigemCampanha: (
      data: AnalyticGQL.IDashboardTop10OrigemCampanhaOnQueryArguments
    ) => ({
      query: `query{
          dashboardTop10OrigemCampanha(initialDate: "${data.initialDate}",finalDate: "${data.finalDate}"){
          qtd,
          url_entrada              
          }
      }`,
    }),
    dashboardOrigemCampanha: (
      data: AnalyticGQL.IDashboardOrigemCampanhaOnQueryArguments
    ) => ({
      query: `query {
        dashboardOrigemCampanha(initialDate: "${data.initialDate}", finalDate: "${data.finalDate}") {
          granulado {
            identificador, valores { chave valor }
          }
          consolidado {
            urlEntrada qtdAcessos qtdNegociacoes vlrNegociacoes
            qtdBoletos vlrBoletos qtdPix vlrPix
          }
        }
      }`,
    }),
  };

  constructor() {
    this.srcWebApi = Axios.create({
      baseURL: srcWebApiUrl,
    });
    this.licenseApi = Axios.create();

    this.analyticApi = Axios.create({
      baseURL: 'http://10.10.10.101:3004/',
    });
  }

  setTokens = (user: GQL.ISigninResponseDto) => {
    this.srcWebApi.defaults.headers.Authorization = `Bearer ${user.token}`;
    this.licenseApi.defaults.headers.Authorization = `Bearer ${user.token_license}`;
  };

  // SRC WEB API ENDPOINTS
  getDBInfo = async (): Promise<DbInfo[]> => {
    const result = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
      'graphql',
      this.queries.getConnections()
    );
    if (result.data.errors) throw new Error(`Erro: ${result.data.errors[0]}`);
    return (result.data.data as GQL.IQuery).getConnections || [];
  };

  login = async (
    userData: LoginDTO
  ): Promise<GQL.ISigninResponseDto | undefined> => {
    const result = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
      'graphql',
      this.queries.login(userData)
    );

    if (result.data.errors) {
      throw new Error(`Erro: ${result.data.errors[0].message}`);
    }

    return (result.data.data as GQL.IQuery)?.login;
  };

  listGroups = async (
    requestData: GQL.IRequestListGroupDto
  ): Promise<Array<Group>> => {
    const result = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
      'graphql',
      this.queries.listGroup(requestData)
    );

    if (result.data.errors) {
      throw new Error(`Erro: ${result.data.errors[0].message}`);
    }
    return (result.data.data as GQL.IQuery).listGroups.map((group) => ({
      COD_GROUP: group.COD_GRUPO,
      groupName: group.groupName,
      groupData: {
        values: {
          actuation: group.acionamentoTotal,
          promiseActuationRatio: group.percentage,
          effectiveTime: 0,
          paymentValue: group.paymentValue,
          positiveActuation: group.acionamentoPositive,
          promises: group.promessaTotal,
          promisesValue: group.promessaValue,
        },
        goals: {
          floor: {
            actuation:
              group.metas.PISO_QTDACIONAMENTOSCPF ||
              group.metas.PISO_QTDACIONAMENTOSCONTRATO,
            promiseActuationRatio:
              ((group.metas.PISO_QTDPROMESSASCPF ||
                group.metas.PISO_QTDPROMESSASCONTRATO) /
                (group.metas.PISO_QTDACIONAMENTOSCPF ||
                  group.metas.PISO_QTDACIONAMENTOSCONTRATO)) *
              100,
            effectiveTime: 0,
            paymentValue: group.metas.PISO_VALORPAGAMENTOS,
            positiveActuation:
              group.metas.PISO_QTDACIONAMENTOSPOSITIVOSCPF ||
              group.metas.PISO_QTDACIONAMENTOSPOSITIVOSCONTRATO,
            promises:
              group.metas.PISO_QTDPROMESSASCPF ||
              group.metas.PISO_QTDPROMESSASCONTRATO,
            promisesValue: group.metas.PISO_VALORPROMESSAS,
          },
          standard: {
            actuation:
              group.metas.META_QTDACIONAMENTOSCPF ||
              group.metas.META_QTDACIONAMENTOSCONTRATO,
            promiseActuationRatio:
              ((group.metas.META_QTDPROMESSASCPF ||
                group.metas.META_QTDPROMESSASCONTRATO) /
                (group.metas.META_QTDACIONAMENTOSCPF ||
                  group.metas.META_QTDACIONAMENTOSCONTRATO)) *
              100,
            effectiveTime: 0,
            paymentValue: group.metas.META_VALORPAGAMENTOS,
            positiveActuation:
              group.metas.META_QTDACIONAMENTOSPOSITIVOSCPF ||
              group.metas.META_QTDACIONAMENTOSPOSITIVOSCONTRATO,
            promises:
              group.metas.META_QTDPROMESSASCPF ||
              group.metas.META_QTDPROMESSASCONTRATO,
            promisesValue: group.metas.META_VALORPROMESSAS,
          },
          super: {
            actuation:
              group.metas.SUPER_QTDACIONAMENTOSCPF ||
              group.metas.SUPER_QTDACIONAMENTOSCONTRATO,
            promiseActuationRatio:
              ((group.metas.SUPER_QTDPROMESSASCPF ||
                group.metas.SUPER_QTDPROMESSASCONTRATO) /
                (group.metas.SUPER_QTDACIONAMENTOSCPF ||
                  group.metas.SUPER_QTDACIONAMENTOSCONTRATO)) *
              100,
            effectiveTime: 0,
            paymentValue: group.metas.SUPER_VALORPAGAMENTOS,
            positiveActuation:
              group.metas.SUPER_QTDACIONAMENTOSPOSITIVOSCPF ||
              group.metas.SUPER_QTDACIONAMENTOSPOSITIVOSCONTRATO,
            promises:
              group.metas.SUPER_QTDPROMESSASCPF ||
              group.metas.SUPER_QTDPROMESSASCONTRATO,
            promisesValue: group.metas.SUPER_VALORPROMESSAS,
          },
        },
      },
    }));
  };

  getGroupComparison = async (
    requestData: GQL.IRequestComparativeGroup
  ): Promise<Array<GroupComparison>> => {
    const result = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
      'graphql',
      this.queries.getGroupComparison(requestData)
    );

    if (result.data.errors) {
      throw new Error(`Erro: ${result.data.errors[0].message}`);
    }

    return (result.data.data as GQL.IQuery).getComparativeGroups.map((g) => ({
      groupName: g.groupName,
      groupData: g.groupArray.map((d) => ({
        key: d.DATA || d.HORA || '0',
        value: d.value,
      })),
    }));
  };

  getListOperatorsByGroup = async (
    requestData: GQL.IRequestListOperatorByGroup
  ): Promise<Operator[]> => {
    const { data } = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
      'graphql',
      this.queries.getListOperatorsByGroup(requestData)
    );

    if (data.errors) throw new Error(`Erro: ${data.errors[0].message}`);
    const resultIMG = await Promise.all(
      (data.data as GQL.IQuery).getListOperatorsByGroup.map((op) =>
        b64toBlob(op.urlAvatar)
      )
    ).then((blobs) => blobs.map((blob) => URL.createObjectURL(blob)));
    return (data.data as GQL.IQuery).getListOperatorsByGroup.map((op, i) => ({
      ...op,
      urlAvatar: resultIMG[i] || '',
      metas: {
        floor: {
          actuation:
            op.metas.PISO_QTDACIONAMENTOSCPF ||
            op.metas.PISO_QTDACIONAMENTOSCONTRATO,
          promiseActuationRatio:
            ((op.metas.PISO_QTDPROMESSASCPF ||
              op.metas.PISO_QTDPROMESSASCONTRATO) /
              (op.metas.PISO_QTDACIONAMENTOSCPF ||
                op.metas.PISO_QTDACIONAMENTOSCONTRATO)) *
            100,
          effectiveTime: 0,
          paymentValue: op.metas.PISO_VALORPAGAMENTOS,
          positiveActuation:
            op.metas.PISO_QTDACIONAMENTOSPOSITIVOSCPF ||
            op.metas.PISO_QTDACIONAMENTOSPOSITIVOSCONTRATO,
          promises:
            op.metas.PISO_QTDPROMESSASCPF || op.metas.PISO_QTDPROMESSASCONTRATO,
          promisesValue: op.metas.PISO_VALORPROMESSAS,
        },
        standard: {
          actuation:
            op.metas.META_QTDACIONAMENTOSCPF ||
            op.metas.META_QTDACIONAMENTOSCONTRATO,
          promiseActuationRatio:
            ((op.metas.META_QTDPROMESSASCPF ||
              op.metas.META_QTDPROMESSASCONTRATO) /
              (op.metas.META_QTDACIONAMENTOSCPF ||
                op.metas.META_QTDACIONAMENTOSCONTRATO)) *
            100,
          effectiveTime: 0,
          paymentValue: op.metas.META_VALORPAGAMENTOS,
          positiveActuation:
            op.metas.META_QTDACIONAMENTOSPOSITIVOSCPF ||
            op.metas.META_QTDACIONAMENTOSPOSITIVOSCONTRATO,
          promises:
            op.metas.META_QTDPROMESSASCPF || op.metas.META_QTDPROMESSASCONTRATO,
          promisesValue: op.metas.META_VALORPROMESSAS,
        },
        super: {
          actuation:
            op.metas.SUPER_QTDACIONAMENTOSCPF ||
            op.metas.SUPER_QTDACIONAMENTOSCONTRATO,
          promiseActuationRatio:
            ((op.metas.SUPER_QTDPROMESSASCPF ||
              op.metas.SUPER_QTDPROMESSASCONTRATO) /
              (op.metas.SUPER_QTDACIONAMENTOSCPF ||
                op.metas.SUPER_QTDACIONAMENTOSCONTRATO)) *
            100,
          effectiveTime: 0,
          paymentValue: op.metas.SUPER_VALORPAGAMENTOS,
          positiveActuation:
            op.metas.SUPER_QTDACIONAMENTOSPOSITIVOSCPF ||
            op.metas.SUPER_QTDACIONAMENTOSPOSITIVOSCONTRATO,
          promises:
            op.metas.SUPER_QTDPROMESSASCPF ||
            op.metas.SUPER_QTDPROMESSASCONTRATO,
          promisesValue: op.metas.SUPER_VALORPROMESSAS,
        },
      },
    }));
  };

  getOperatorsIds = async (COD_GROUP: number) => {
    try {
      const { data } = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
        'graphql',
        this.queries.getOperatorsIds({
          COD_GROUP,
          initDate: moment().format('YYYY-MM-DD'),
          endDate: moment().format('YYYY-MM-DD'),
          param: 'CPF',
          token_license: (this.licenseApi.defaults.headers
            .Authorization as string).replace('Bearer ', ''),
          licenseApiUrl: this.licenseApi.defaults.baseURL || '',
        })
      );
      const result = data.data as GQL.IQuery;
      const resultArray = result.getListOperatorsByGroup.map(
        (op) => op.COD_RECUP
      );
      return resultArray;
    } catch (e) {
      return [];
    }
  };

  getOperatorDetails = async (
    requestData: GQL.IRequestUserDetail
  ): Promise<GQL.IResponseUserDetail> => {
    const { data } = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
      'graphql',
      this.queries.getUserDetails(requestData)
    );

    if (data.errors) throw new Error(`Erro: ${data.errors[0].message}`);
    return (data.data as GQL.IQuery).getOperatorDetail;
  };

  getOperatorName = async (
    requestData: GQL.IRequestUserDetail
  ): Promise<string | null> => {
    const { data } = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
      'graphql',
      this.queries.getUserName(requestData)
    );

    if (data.errors) throw new Error(`Erro: ${data.errors[0].message}`);
    return (data.data as GQL.IQuery).getOperatorDetail.NOME_RECUP;
  };

  getOperatorHistory = async (
    requestData: GQL.IRequestUserHistory
  ): Promise<OperatorHistory> => {
    const { data } = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
      'graphql',
      this.queries.getUserHistory(requestData)
    );

    if (data.errors) throw new Error(`Erro: ${data.errors[0].message}`);
    const op = (data.data as GQL.IQuery).getOperatorHistory;
    return {
      data: op.groupArray
        .map((currOpComp) => ({
          key: currOpComp.HORA || currOpComp.DATA || ' ',
          value: currOpComp.value,
        }))
        .sort((a, b) => {
          if (a.key.length <= 2) return Number(a.key) - Number(b.key);
          return moment(a.key).valueOf() - moment(b.key).valueOf();
        }),
      metas: {
        floor: {
          actuation:
            op.metas.PISO_QTDACIONAMENTOSCPF ||
            op.metas.PISO_QTDACIONAMENTOSCONTRATO,
          promiseActuationRatio:
            ((op.metas.PISO_QTDPROMESSASCPF ||
              op.metas.PISO_QTDPROMESSASCONTRATO) /
              (op.metas.PISO_QTDACIONAMENTOSCPF ||
                op.metas.PISO_QTDACIONAMENTOSCONTRATO)) *
            100,
          effectiveTime: 0,
          paymentValue: op.metas.PISO_VALORPAGAMENTOS,
          positiveActuation:
            op.metas.PISO_QTDACIONAMENTOSPOSITIVOSCPF ||
            op.metas.PISO_QTDACIONAMENTOSPOSITIVOSCONTRATO,
          promises:
            op.metas.PISO_QTDPROMESSASCPF || op.metas.PISO_QTDPROMESSASCONTRATO,
          promisesValue: op.metas.PISO_VALORPROMESSAS,
        },
        standard: {
          actuation:
            op.metas.META_QTDACIONAMENTOSCPF ||
            op.metas.META_QTDACIONAMENTOSCONTRATO,
          promiseActuationRatio:
            ((op.metas.META_QTDPROMESSASCPF ||
              op.metas.META_QTDPROMESSASCONTRATO) /
              (op.metas.META_QTDACIONAMENTOSCPF ||
                op.metas.META_QTDACIONAMENTOSCONTRATO)) *
            100,
          effectiveTime: 0,
          paymentValue: op.metas.META_VALORPAGAMENTOS,
          positiveActuation:
            op.metas.META_QTDACIONAMENTOSPOSITIVOSCPF ||
            op.metas.META_QTDACIONAMENTOSPOSITIVOSCONTRATO,
          promises:
            op.metas.META_QTDPROMESSASCPF || op.metas.META_QTDPROMESSASCONTRATO,
          promisesValue: op.metas.META_VALORPROMESSAS,
        },
        super: {
          actuation:
            op.metas.SUPER_QTDACIONAMENTOSCPF ||
            op.metas.SUPER_QTDACIONAMENTOSCONTRATO,
          promiseActuationRatio:
            ((op.metas.SUPER_QTDPROMESSASCPF ||
              op.metas.SUPER_QTDPROMESSASCONTRATO) /
              (op.metas.SUPER_QTDACIONAMENTOSCPF ||
                op.metas.SUPER_QTDACIONAMENTOSCONTRATO)) *
            100,
          effectiveTime: 0,
          paymentValue: op.metas.SUPER_VALORPAGAMENTOS,
          positiveActuation:
            op.metas.SUPER_QTDACIONAMENTOSPOSITIVOSCPF ||
            op.metas.SUPER_QTDACIONAMENTOSPOSITIVOSCONTRATO,
          promises:
            op.metas.SUPER_QTDPROMESSASCPF ||
            op.metas.SUPER_QTDPROMESSASCONTRATO,
          promisesValue: op.metas.SUPER_VALORPROMESSAS,
        },
      },
    };
  };

  getOperatorComparison = async (
    requestData: GQL.IRequestComparativeOperatorByGroup
  ): Promise<Array<OperatorComparison>> => {
    const { data } = await this.srcWebApi.post<GQL.IGraphQLResponseRoot>(
      'graphql',
      this.queries.getOperatorsComparison(requestData)
    );
    if (data.errors) throw new Error(`Erro: ${data.errors[0].message}`);
    const result = (data.data as GQL.IQuery).getComparativeOperatorsByGroup[0]
      .groupArray;
    // separar operadores diferentes do array principal.
    const operatorCodes = result.reduce((prev, curr) => {
      if (!prev.find((p) => p === curr.COD_RECUP)) {
        prev.push(curr.COD_RECUP as number);
      }
      return prev;
    }, new Array<number>());
    // Normalizar para uso na aplicação.
    return operatorCodes.map((opCod) => {
      const currentOperatorComparisons = result.filter(
        (comp) => comp.COD_RECUP === opCod
      );
      return {
        operatorName: currentOperatorComparisons[0]?.NOME_RECUP.trim(),
        operatorCode: currentOperatorComparisons[0]?.COD_RECUP || 0,
        operatorData: currentOperatorComparisons
          .map((currOpComp) => ({
            key: currOpComp.HORA || currOpComp.DATA || '',
            value: currOpComp.value,
          }))
          .sort((a, b) => {
            if (a.key.length <= 2) return Number(a.key) - Number(b.key);
            return moment(a.key).valueOf() - moment(b.key).valueOf();
          }),
      };
    });
  };

  clearAuthHeader = () => {
    this.srcWebApi.defaults.headers.Authorization = '';
    this.licenseApi.defaults.headers.Authorization = '';
  };

  // LICENSE API ENDPOINTS
  sendMessage = async (data: LicenseAPI.IRequestSendMessage) => {
    await this.licenseApi.post('/api/mensagem/enviarmensagem', data);
  };

  sendMessageToOperators = async (
    data: LicenseAPI.IRequestSendMessageOperators
  ) => {
    await this.licenseApi.post('/api/mensagem/enviarmensagemoperadores', data);
  };

  answerMessage = async (data: LicenseAPI.IResquestAnswerMessage) => {
    await this.licenseApi.post('/api/mensagem/respondermensagem', data);
  };

  licensePing = async () => {
    const result = await this.licenseApi.post('/api/updateLogin/ping');
    switch (result.data) {
      case 1:
        throw new Error('Force Logout');
      default:
        return result.data;
    }
  };

  licenseLogout = async () => {
    if (!this.licenseApi.defaults.headers.Authorization) return;
    try {
      await this.licenseApi.post('/api/updateLogin/logout');
    } catch (e) {
      throw new Error('Erro ao liberar a licença.');
    } finally {
      this.clearAuthHeader();
    }
  };

  // Logar como se fosse do PANEL????
  licenseInfo = async (): Promise<LicenseInfo> => {
    try {
      const response = await this.licenseApi.get(
        '/api/licenca/obterInformacoes',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('licenseToken')}`,
          },
        }
      );
      return {
        expireDate: response.data.Validade,
        quantity: response.data.Quantidade,
        type: response.data.TipoLicenca,
      };
    } catch (e) {
      throw new Error('Não foi possível carregar dados de licença!');
    }
  };

  /** Usa token de panel */
  getLicenseUsage = async (
    interval: DateInterval
  ): Promise<Array<LicenseUsageData>> => {
    try {
      const token = localStorage.getItem('licenseToken');
      const response = await this.licenseApi.get<
        Array<LicenseAPI.IResponseLicenseData>
      >('/api/filtroacesso/obterquantidadeacessos', {
        params: {
          dataFinal: moment(interval.end).format('YYYY/MM/DD'),
          dataInicial: moment(interval.start).format('YYYY/MM/DD'),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return getDatesAndValuesBetweenTwoDates(
        interval.start.toString(),
        interval.end.toString(),
        response.data
      );
    } catch (e) {
      throw new Error('Não foi possível carregar os acessos.');
    }
  };

  /** @param selectedDate - matching dd/mm/yyyy */
  getDetailedData = async (selectedDate: string) =>
    this.licenseApi.get<LicenseAPI.IResponseLicenseDataByDay>(
      'api/filtroacesso/obteracessospordata',
      {
        params: {
          data: selectedDate,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('licenseToken')}`,
        },
      }
    );

  forceLogout = async (idLogin: number) =>
    this.licenseApi.post(
      'api/updateLogin/forcelogout',
      {},
      {
        params: {
          idLogin,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('licenseToken')}`,
        },
      }
    );

  readLicense = async (hashLicenca: string) =>
    this.licenseApi.post<LicenseAPI.IResponseLicenseInfo>(
      'api/licenca/lerLicenca',
      { hashLicenca },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('licenseToken')}`,
        },
      }
    );

  addLicense = async (hashLicenca?: string) =>
    this.licenseApi.post(
      'api/licenca/adicionarLicenca',
      { hashLicenca },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('licenseToken')}`,
        },
      }
    );

  loginLicense = (data: LoginDTO) => {
    return this.licenseApi.post(
      'logar',
      qs.stringify({
        grant_type: 'password',
        username: data.username,
        password: md5(data.password),
        from: 'PANEL',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };

  activeUsersNow = async (): Promise<Array<AnalyticGQL.IDashboardAtivos>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.activeUsersNow());
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).ativosAgora;
  };

  detailActiveUsersNow = async (
    page: number
  ): Promise<Array<AnalyticGQL.IDetailActiveNowHour>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.detailActiveUsersNow(page));
    if (response.data.errors?.length) {
      throw new Error(response.data.errors[0].message);
    }
    return (response.data.data as AnalyticGQL.IQuery).detailActiveNow;
  };

  getTopTenByAccess = async (
    data: AnalyticGQL.IGetTopTenByAccessOnQueryArguments
  ): Promise<Array<AnalyticGQL.ITopTenByAccessModel>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.getTopTenByAccess(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).getTopTenByAccess;
  };

  usersByDayHour = async (
    data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
  ): Promise<Array<AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraModel>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.usersByDayHour(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery)
      .usuariosPorDiaDaSemanaEHora;
  };

  abstractUserChart = async (
    data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardResumoComHora>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.abstractUserChart(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).resumoUsuariosLogados;
  };

  abstractSessions = async (
    data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardResumoComHora>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.abstractSessions(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).resumoSessions;
  };

  abstractPayments = async (
    data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardResumoComHora>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.abstractPayments(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).resumoGraficoPagamentos;
  };

  abstractDashboard = async (
    data: AnalyticGQL.IDashboardResumoOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardResumo>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.abstractDashboard(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).dashboardResumo;
  };

  abstractChartPaper = async (
    data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardResumoComHora>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.abstractChartPaper(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).resumoGraficoBoletos;
  };

  abstractProposalChart = async (
    data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardResumoComHora>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.abstractProposalChart(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).resumoGraficoPropostas;
  };

  abstractAgreementChart = async (
    data: AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardResumoComHora>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.abstractAgreementChart(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).resumoGraficoAcordos;
  };

  dashboardTop10Negociacoes = async (
    data: AnalyticGQL.IDashboardTop10NegociacoesOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardTop10NegociacoesObj>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.dashboardTop10Negociacoes(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).dashboardTop10Negociacoes;
  };

  dashboardDesistencias = async (
    data: AnalyticGQL.IDashboardDesistenciasOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardDesistencia>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.dashboardDesistencias(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).dashboardDesistencias;
  };

  devicesUsed = async (
    data: AnalyticGQL.IDispositivosUtilizadosOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardDipositivosUtilizados>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.devicesUsed(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).dispositivosUtilizados;
  };

  dashboardDevicesUsed = async (
    data: AnalyticGQL.IDashboardDetalhamentoDispositivosUtilizadosOnQueryArguments
  ): Promise <AnalyticGQL.IDashboardDetalhamentoDispositivosUtilizadosDTO> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.dashboardDevicesUsed(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery).
    dashboardDetalhamentoDispositivosUtilizados;
  };

  dashboardTop10OrigemCampanha = async (
    data: AnalyticGQL.IDashboardTop10OrigemCampanhaOnQueryArguments
  ): Promise<Array<AnalyticGQL.IDashboardTop10OrigemCampanha>> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.dashboardTop10OrigemCampanha(data));
    if (response.data.errors?.length)
      throw new Error(response.data.errors[0].message);
    return (response.data.data as AnalyticGQL.IQuery)
      .dashboardTop10OrigemCampanha;
  };

  detailOriginCampaignSaga = async (
    data: AnalyticGQL.IDashboardOrigemCampanhaOnQueryArguments
  ): Promise<AnalyticGQL.IDashboardOrigemCampanha> => {
    const response = await this.analyticApi.post<
      AnalyticGQL.IGraphQLResponseRoot
    >('graphql', this.queries.dashboardOrigemCampanha(data));

    if (response.data.errors?.length) {
      throw new Error(response.data.errors[0].message);
    }

    return (response.data.data as AnalyticGQL.IQuery).dashboardOrigemCampanha;
  };

  setLicenseUrl = (url: string) => {
    // formato: http://10.10.10.11:3000
    this.licenseApi.defaults.baseURL = url;
    this.licenseApi.defaults.url = url;
  };
}

export default new API();
