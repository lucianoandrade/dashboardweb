declare interface DateInterval {
  start: moment.Moment;
  end: moment.Moment;
}

declare type IntervalTypes = 'day' | 'week' | 'month' | 'custom';
declare type ParamTypes = 'cpf' | 'contrato';

declare interface FilterState {
  dateFilter: DateInterval;
  choosenInterval: IntervalTypes;
  param: ParamTypes;
}
