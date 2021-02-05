import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions'

import login from './login';
import license from './license';
import filter from './filter';
import groups from './groups';
import operators from './operators';
import chat from './chat/index';
import analytic from './analytic';

type ActionsUnion =
  | typeof import('./chat/actions')
  | typeof import('./analytic/actions')

declare type RootAction = ActionType<ActionsUnion>;
declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}

export default combineReducers({
  login,
  license,
  filter,
  groups,
  operators,
  analytic,
  chat,
});
