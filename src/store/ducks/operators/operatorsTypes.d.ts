declare type OperatorViewType = 'list' | 'comparison' | 'details' | 'history';
declare type OperatorViewBy =
  | 'Performance'
  | 'Acionamento'
  | 'Promessa'
  | 'PromessaValue'
  | 'Efetividade';
declare interface Goals {
  floor: GroupValue;
  standard: GroupValue;
  super: GroupValue;
}

declare interface OperatorDetails {
  nomeFilial: string;
  login: string;
  tipoUsuario: string;
  celular: number;
  entryTime: string;
  derpatureTime: string;
  intervalType: string;
  email: string;
  name: string;
  extensionline: string;
}

declare interface OperatorHistory {
  data: OperatorDataComparison[];
  metas: Goals;
}

declare interface SelectedOperator {
  operator?: Operator;
  details?: GQL.IResponseUserDetail;
  history?: OperatorHistory;
}

declare interface Operator {
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
  metas: Goals;
}

declare type OperatorSort =
  | 'COD_RECUP'
  | 'operatorName'
  | 'acionamentoTotal'
  | 'acionamentoPositive'
  | 'promessaTotal'
  | 'promessaValue';

declare interface OperatorDataComparison {
  key: string;
  value: number;
}

declare interface OperatorComparison {
  operatorName: string;
  operatorCode: number;
  operatorData: Array<OperatorDataComparison>;
}

declare interface OperatorsState {
  operators: Operator[];
  operatorsComparison: Array<OperatorComparison>;
  selectedOperator: SelectedOperator;
  showOnChart: Array<number>;
  view: OperatorViewType;
  viewBy: OperatorViewBy;
  loading: boolean;
}
