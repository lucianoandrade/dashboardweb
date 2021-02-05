import { action, Action } from 'typesafe-actions';

export enum SetFilterTypes {
  SETDATEINTERVAL = '@Filter/SETDATEINTERVAL',
  SETCUSTOMDATEINTERVAL = '@Filter/SETCUSTOMDATEINTERVAL',
  SETPARAM = '@Filter/SETPARAM',
}

export const setChoosenInterval = (data: IntervalTypes): Action =>
  action(SetFilterTypes.SETDATEINTERVAL, data);

export const setCustomInterval = (data: DateInterval): Action =>
  action(SetFilterTypes.SETCUSTOMDATEINTERVAL, data);

export const setChoosenParam = (data: ParamTypes): Action =>
  action(SetFilterTypes.SETPARAM, data);
