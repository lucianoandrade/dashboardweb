import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { incomingMessage } from '../chat/actions';
import { logoutRequest } from '../login/actions';
import { getUser } from '../login/selectors';
import {
  licenseData,
  licenseInfo,
  LicensePingType,
  pingTimeoutAbort,
  pingTimeoutUpdate,
  setLicenseInterval,
} from './actions';
import { shouldLogout } from './selectors';

export function* pingSaga(): Generator {
  while (yield select(getUser)) {
    try {
      const response = yield call(api.licensePing);
      if ((response as LicenseAPI.IResponsePingMessage).id) {
        const message = response as LicenseAPI.IResponsePingMessage;
        yield put(incomingMessage(message));
        continue;
      }
      yield put(pingTimeoutAbort());
    } catch (error) {
      if (/unauthorized/i.test(error.message)) {
        yield put(logoutRequest());
      } else {
        switch (error.message) {
          case 'Force Logout':
            yield put(logoutRequest());
            break;
          default:
            yield put(pingTimeoutUpdate());

            if (yield select(shouldLogout)) {
              yield put(logoutRequest());
              yield put(pingTimeoutAbort());
            }
        }
      }
    }
    yield delay(process.env.NODE_ENV === 'development' ? 1000 : 30000); // espera 30 segundos
  }
}

export function* infoRequestSaga(): Generator {
  try {
    const license = yield call(api.licenseInfo);
    yield put(licenseInfo.success(license as LicenseInfo));
  } catch (e) {
    yield put(licenseInfo.failure(e.message));
  }
}
export function* usageRequestSaga(): Generator {
  try {
    const interval = (yield select(
      (state: SRCWEB.ApplicationState) => state.license.dateInterval
    )) as DateInterval;
    const license = yield call(api.getLicenseUsage, interval);
    yield put(licenseData.success(license as LicenseUsageData[]));
  } catch (e) {
    yield put(licenseData.failure(e.message));
  }
}

export default all([
  takeLatest(LicensePingType.LOAD_REQUEST, pingSaga),
  takeLatest(licenseInfo.request, infoRequestSaga),
  takeLatest([licenseData.request, setLicenseInterval], usageRequestSaga),
]);
