import {
  action,
  Action,
  createAsyncAction,
  createAction,
} from 'typesafe-actions';

// Action Types
export enum LicensePingType {
  LOAD_REQUEST = '@licensePing/LOAD_REQUEST',
  LOAD_SUCCESS = '@licensePing/LOAD_SUCCESS',
  LOAD_FAILURE = '@licensePing/LOAD_FAILURE',
}

export enum PingTimeoutType {
  UPDATE = '@licensePingtimeout/UPDATE',
  ABORT = '@licensePingtimeout/ABORT',
}

export const pingSagaRequest = (): Action =>
  action(LicensePingType.LOAD_REQUEST);

export const pingTimeoutUpdate = (): Action => action(PingTimeoutType.UPDATE);
export const pingTimeoutAbort = (): Action => action(PingTimeoutType.ABORT);

export const setLicenseInterval = createAction('@license/SELECT_DATE_INTERVAL')<
  DateInterval
>();

export const licenseInfo = createAsyncAction(
  '@license/FETCH_INFO_REQUEST',
  '@license/FETCH_INFO_SUCCESS',
  '@license/FETCH_INFO_FAILURE'
)<undefined, LicenseInfo, string>();

export const licenseData = createAsyncAction(
  '@license/FETCH_DATA_REQUEST',
  '@license/FETCH_DATA_SUCCESS',
  '@license/FETCH_DATA_FAILURE'
)<undefined, Array<LicenseUsageData>, string>();

export const setSelectedDate = createAction('@license/SELECT_DATE')<string>();
