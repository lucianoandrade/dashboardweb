import { action, Action, createAsyncAction } from 'typesafe-actions';

export enum OperatorRequestTypes {
  LOAD = '@operator/LOAD',
  SUCCESS = '@operator/SUCCESS',
  FAILURE = '@operator/FAILURE',
}
export enum OperatorComparisonRequestTypes {
  LOAD = '@operatorComparison/LOAD',
  SUCCESS = '@operatorComparison/SUCCESS',
  FAILURE = '@operatorComparison/FAILURE',
}

export enum OperatorSelectTypes {
  SET = '@selectOperator/SET',
  CLEAN = '@selectOperator/CLEAN',
}

export enum OperatorDetailsTypes {
  LOAD = '@operatorDetails/LOAD',
  SUCCESS = '@operatorDetails/SUCCESS',
}

export enum OperatorHistoryTypes {
  LOAD = '@operatorHistory/LOAD',
  SUCCESS = '@operatorHistory/SUCCESS',
}

export enum SetOperatorFilterTypes {
  SETDATEINTERVAL = '@operatorFilter/SETDATEINTERVAL',
  SETCUSTOMDATEINTERVAL = '@operatorFilter/SETCUSTOMDATEINTERVAL',
  SETPARAM = '@operatorFilter/SETPARAM',
}

export enum OperatorViewTypes {
  SETPAGEVIEW = '@operatorView/SETPAGEVIEW',
  SETPAGEVIEWBY = '@operatorView/SETPAGEVIEWBY',
}
export enum ShowOnChart {
  SET = '@operatorShowOnChart/SET',
}

export const loadOperator = (): Action => action(OperatorRequestTypes.LOAD);

export const loadOperatorSuccess = (data: Operator[]): Action =>
  action(OperatorRequestTypes.SUCCESS, data);

export const selectOperator = (data: Operator | undefined): Action =>
  action(OperatorSelectTypes.SET, data);

export const loadOperatorDetails = (): Action =>
  action(OperatorDetailsTypes.LOAD);

export const loadOperatorDetailsSuccess = (
  data: GQL.IResponseUserDetail
): Action => action(OperatorDetailsTypes.SUCCESS, data);

export const loadOperatorHistory = (): Action =>
  action(OperatorHistoryTypes.LOAD);

export const loadOperatorHistorySuccess = (
  data: GQL.IResponseUserHistory
): Action => action(OperatorHistoryTypes.SUCCESS, data);

export const cleanSelectedOperator = (): Action =>
  action(OperatorSelectTypes.CLEAN);

export const loadOperatorComparison = (): Action =>
  action(OperatorComparisonRequestTypes.LOAD);

export const loadOperatorComparisonSuccess = (
  data: Array<OperatorComparison>
): Action => action(OperatorComparisonRequestTypes.SUCCESS, data);

export const setOperatorView = (data: OperatorViewType): Action =>
  action(OperatorViewTypes.SETPAGEVIEW, data);

export const setOperatorViewBy = (data: OperatorViewBy): Action =>
  action(OperatorViewTypes.SETPAGEVIEWBY, data);

export const setShowOnChart = (data: Array<number>): Action =>
  action(ShowOnChart.SET, data);

export const loadOwnOperatorData = createAsyncAction(
  '@OperatorOwnData/LOAD',
  '@OperatorOwnData/SUCCESS',
  '@OperatorOwnData/ERROR'
)<undefined, Operator, string>();
