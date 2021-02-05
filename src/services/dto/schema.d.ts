// tslint:disable
// graphql typescript definitions

declare namespace GQL {
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
    getOperatorDetail: IResponseUserDetail;
    getOperatorHistory: IResponseUserHistory;
    listGroups: Array<IResponseListGroupDto>;
    getComparativeGroups: Array<IResponseComparativeGroup>;
    getListOperatorsByGroup: Array<IResponseListOperatorByGroup>;
    getComparativeOperatorsByGroup: Array<IResponseComparativeOperatorByGroup>;
    getConnections: Array<IGetCadBaseDto>;
    login: ISigninResponseDto;
    getToken: IGetTokenResponseDto;
  }

  interface IGetOperatorDetailOnQueryArguments {
    request: IRequestUserDetail;
  }

  interface IGetOperatorHistoryOnQueryArguments {
    request: IRequestUserHistory;
  }

  interface IListGroupsOnQueryArguments {
    request: IRequestListGroupDto;
  }

  interface IGetComparativeGroupsOnQueryArguments {
    request: IRequestComparativeGroup;
  }

  interface IGetListOperatorsByGroupOnQueryArguments {
    request: IRequestListOperatorByGroup;
  }

  interface IGetComparativeOperatorsByGroupOnQueryArguments {
    request: IRequestComparativeOperatorByGroup;
  }

  interface ILoginOnQueryArguments {
    number: number;
    senha: string;
    login: string;
  }

  interface IGetTokenOnQueryArguments {
    number: number;
    senha: string;
    login: string;
  }

  interface IRequestUserDetail {
    id: number;
  }

  interface IResponseUserDetail {
    __typename: 'ResponseUserDetail';
    NOME_FILIAL: string | null;
    COD_RECUP: number;
    LOGIN_RECUP: string | null;
    TIPO_USUARIO: string | null;
    CELULAR_RECUP: number;
    HORA_ENTRADA: string | null;
    HORA_SAIDA: string | null;
    TIPOINTERVALO_CAR: string | null;
    EMAIL_RECUP: string | null;
    NOME_RECUP: string | null;
    RAMAL: string | null;
  }

  interface IRequestUserHistory {
    param: string;
    initDate: string;
    endDate: string;
    COD_RECUP: number;
    historyType: string;
  }

  interface IResponseUserHistory {
    __typename: 'ResponseUserHistory';
    groupArray: Array<IUserHistory>;
    metas: IMetasDto;
  }

  interface IUserHistory {
    __typename: 'UserHistory';
    DATA: string | null;
    value: number;
    HORA: string | null;
  }

  interface IMetasDto {
    __typename: 'MetasDto';
    META_QTDACIONAMENTOSCPF: number;
    META_QTDACIONAMENTOSPOSITIVOSCPF: number;
    META_QTDPROMESSASCPF: number;
    META_QTDACIONAMENTOSCONTRATO: number;
    META_QTDACIONAMENTOSPOSITIVOSCONTRATO: number;
    META_QTDPROMESSASCONTRATO: number;
    META_VALORPROMESSAS: number;
    META_VALORPAGAMENTOS: number;
    META_EFETIVIDADEACIONAMENTOS: number;
    PISO_QTDACIONAMENTOSCPF: number;
    PISO_QTDACIONAMENTOSPOSITIVOSCPF: number;
    PISO_QTDPROMESSASCPF: number;
    PISO_QTDACIONAMENTOSCONTRATO: number;
    PISO_QTDACIONAMENTOSPOSITIVOSCONTRATO: number;
    PISO_QTDPROMESSASCONTRATO: number;
    PISO_VALORPROMESSAS: number;
    PISO_VALORPAGAMENTOS: number;
    PISO_EFETIVIDADEACIONAMENTOS: number;
    SUPER_QTDACIONAMENTOSCPF: number;
    SUPER_QTDACIONAMENTOSPOSITIVOSCPF: number;
    SUPER_QTDPROMESSASCPF: number;
    SUPER_QTDACIONAMENTOSCONTRATO: number;
    SUPER_QTDACIONAMENTOSPOSITIVOSCONTRATO: number;
    SUPER_QTDPROMESSASCONTRATO: number;
    SUPER_VALORPROMESSAS: number;
    SUPER_VALORPAGAMENTOS: number;
    SUPER_EFETIVIDADEACIONAMENTOS: number;
  }

  interface IRequestListGroupDto {
    param: string;
    initDate: string;
    endDate: string;
    COD_RECUP: number;
    COD_GROUP: number;
  }

  interface IResponseListGroupDto {
    __typename: 'ResponseListGroupDto';
    groupName: string;
    COD_GRUPO: number;
    acionamentoTotal: number;
    acionamentoPositive: number;
    promessaTotal: number;
    promessaValue: number;
    paymentValue: number;
    percentage: number;
    metas: IMetasDto;
  }

  interface IRequestComparativeGroup {
    param: string;
    initDate: string;
    endDate: string;
    COD_RECUP: number;
    comparativeType: string;
  }

  interface IResponseComparativeGroup {
    __typename: 'ResponseComparativeGroup';
    groupName: string;
    groupArray: Array<IGroupComparative>;
  }

  interface IGroupComparative {
    __typename: 'GroupComparative';
    DATA: string | null;
    value: number;
    HORA: string | null;
  }

  interface IRequestListOperatorByGroup {
    param: string;
    initDate: string;
    endDate: string;
    COD_GROUP: number;
    token_license: string;
    licenseApiUrl: string;
  }

  interface IResponseListOperatorByGroup {
    __typename: 'ResponseListOperatorByGroup';
    operatorName: string;
    operatorLogin: string;
    COD_RECUP: number;
    urlAvatar: string;
    isOnline: boolean | null;
    metaAtendimento: number | null;
    workTime: number | null;
    pauseLimit: number;
    pauseTime: number;
    acionamentoTotal: number;
    acionamentoPositive: number;
    promessaTotal: number;
    promessaValue: number;
    paymentValue: number;
    percentage: number;
    metas: IMetasDto;
  }

  interface IRequestComparativeOperatorByGroup {
    param: string;
    initDate: string;
    endDate: string;
    COD_GROUP: number;
    comparativeType: string;
  }

  interface IResponseComparativeOperatorByGroup {
    __typename: 'ResponseComparativeOperatorByGroup';
    groupArray: Array<IOperatorComparative>;
  }

  interface IOperatorComparative {
    __typename: 'OperatorComparative';
    DATA: string | null;
    NOME_RECUP: string;
    COD_RECUP: number | null;
    value: number;
    HORA: string | null;
  }

  interface IGetCadBaseDto {
    __typename: 'GetCadBaseDto';
    number: number;
    dbName: string;
  }

  interface ISigninResponseDto {
    __typename: 'SigninResponseDto';
    token: string;
    login: string;
    name: string;
    email: string;
    group_name: string | null;
    token_license: string;
    COD_RECUP: number;
    nivelGroup: number;
    COD_GROUP: number;
    imageB64: string;
    permission: Array<string>;
    licenseApiUrl: string;
  }

  interface IGetTokenResponseDto {
    __typename: 'GetTokenResponseDto';
    token: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    createAcionamento: string;
    createPromessa: string;
  }

  interface ICreateAcionamentoOnMutationArguments {
    acionamento: IAcionamentoRequestDto;
  }

  interface ICreatePromessaOnMutationArguments {
    promessa: IPromessaRequestDto;
  }

  interface IAcionamentoRequestDto {
    COD_RECUP: number;
    COD_GROUP: number;
    date: any;
    hour: number;
    qtd_acionamentos: number;
    positive: boolean;
  }

  interface IPromessaRequestDto {
    COD_RECUP: number;
    COD_GROUP: number;
    date: any;
    hour: number;
    QTD_CONTRATOS: number;
    VALOR_TOTAL: number;
  }
}

// tslint:enable
