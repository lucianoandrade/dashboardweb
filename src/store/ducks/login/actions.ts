import { action, Action, createAction } from 'typesafe-actions';
import { LoginDTO } from '../../../services/dto/Login';

// Action Types
export enum DbInfoTypes {
  LOAD_REQUEST = '@dbInfo/LOAD_REQUEST',
  LOAD_SUCCESS = '@dbInfo/LOAD_SUCCESS',
  LOAD_FAILURE = '@dbInfo/LOAD_FAILURE',
}

export enum LoginTypes {
  LOAD_REQUEST = '@login/LOAD_REQUEST',
  LOAD_SUCCESS = '@login/LOAD_SUCCESS',
  LOAD_FAILURE = '@login/LOAD_FAILURE',
}

export enum LogoutTypes {
  REQUEST = '@logout/REQUEST',
  SUCCESS = '@logout/SUCCESS',
  FAILURE = '@logout/FAILURE',
}

export const SupervisorType = '@user/SET_SUPERVISOR';

export const loadDBInfoRequest = (): Action => action(DbInfoTypes.LOAD_REQUEST);
export const loadDBInfoSuccess = (data: Array<DbInfo>): Action =>
  action(DbInfoTypes.LOAD_SUCCESS, { data });

export const loginRequest = (data: LoginDTO): Action =>
  action(LoginTypes.LOAD_REQUEST, { data });
export const loginSuccess = (data: GQL.ISigninResponseDto): Action =>
  action(LoginTypes.LOAD_SUCCESS, { data });

export const logoutRequest = (): Action => action(LogoutTypes.REQUEST);
export const logoutSuccess = (): Action => action(LogoutTypes.SUCCESS);

export const setIsSupervisor = createAction(SupervisorType)<boolean>();
