export interface ChartPagesData {
  property: keyof Operator;
  goalName: keyof GroupValue;
  displayText: string;
}
export const chartPages: Array<ChartPagesData> = [
  {
    property: 'acionamentoTotal',
    displayText: 'Acionamento Total',
    goalName: 'actuation',
  },
  {
    property: 'acionamentoPositive',
    displayText: 'Acionamento Positivo',
    goalName: 'positiveActuation',
  },
  {
    property: 'promessaTotal',
    displayText: 'Qtd. Promessas',
    goalName: 'promises',
  },
  {
    property: 'promessaValue',
    displayText: 'Valor de Promessas',
    goalName: 'promisesValue',
  },
];
export const maxOperatorsOnChart = 20;
