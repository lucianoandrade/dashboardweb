declare interface ChartData {
  label: string;
  color: string;
  maxValue: number;
  value: number;
  type: ChartDataType;
}

declare type ChartDataType =
  | 'number'
  | 'string'
  | 'HH:mm'
  | 'HH:mm:ss'
  | 'BRL'
  | 'mm:ss'
  | 'percent';
