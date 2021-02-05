declare namespace GroupComparison {
  declare interface Values {
    name: string;
    actuation: number;
    positiveActuation: number;
    promises: number;
    promisesValue: number;
  }
  declare type GroupData = Values & {
    goal: Values;
  };
}
