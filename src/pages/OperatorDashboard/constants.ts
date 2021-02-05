import { TabItems } from '../../components/SubHeader/SubHeader';

// SUBHEADER CONSTANTS
export const selectableTabs: TabItems[] = [
  {
    label: 'Lista Operadores',
    view: 'list',
  },
  {
    label: 'Comparativo',
    view: 'comparison',
  },
];

export const selectableTabsOperator: TabItems[] = [
  {
    label: 'Histórico',
    view: 'history',
  },
  {
    label: 'Dados Operador',
    view: 'details',
  },
];

// FILTERBAR CONSTANTES
export const TabsWithOptions = ['comparison', 'history'];
interface ITabOption {
  key: string;
  value: OperatorViewBy;
}
interface ITabOptions {
  comparison: Array<ITabOption>;
  history: ITabOption[];
}
export const TabOptions: ITabOptions = {
  comparison: [
    {
      key: 'Desempenho por Operadores ',
      value: 'Performance',
    },
    {
      key: 'Acionamento Positivo',
      value: 'Acionamento',
    },
    {
      key: 'Quantidade de promessas',
      value: 'Promessa',
    },
    {
      key: 'Valor de Promessas',
      value: 'PromessaValue',
    },
  ],
  history: [
    {
      key: 'Efetividade',
      value: 'Performance',
    },
    {
      key: 'Acionamento Positivo',
      value: 'Acionamento',
    },
    {
      key: 'Quantidade de promessas',
      value: 'Promessa',
    },
    {
      key: 'Valor de Promessas',
      value: 'PromessaValue',
    },
  ],
};

export const selectableIntervals = [
  {
    key: 'Hoje',
    value: 'day',
  },
  {
    key: 'Esta Semana',
    value: 'week',
  },
  {
    key: 'Este Mês',
    value: 'month',
  },
  {
    key: 'Período',
    value: 'custom',
  },
];

export const selectableParams = [
  {
    key: 'CPF',
    value: 'cpf',
  },
  {
    key: 'Contrato',
    value: 'contrato',
  },
];
