import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import {
  all,
  call,
  delay,
  put,
  select,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';
import { persistor } from '../..';
import api from '../../../services/api';
import { LoginDTO } from '../../../services/dto/Login';
import { pingSagaRequest } from '../license/actions';
import {
  DbInfoTypes,
  loadDBInfoRequest,
  loadDBInfoSuccess,
  loginSuccess,
  LoginTypes,
  LogoutTypes,
  setIsSupervisor,
} from './actions';
import { getUser } from './selectors';

export function* loadDBInfo(): Generator {
  try {
    while (true) {
      const response = yield call(api.getDBInfo);
      yield put(loadDBInfoSuccess(response as DbInfo[]));
      yield delay(30000);
    }
  } catch (error) {
    switch (error.message) {
      case 'Network Error':
        toast('Não foi possível se conectar.', { type: 'error' });
        break;
      default:
        toast(`${error.message}`, { type: 'error' });
    }
    yield delay(30000);
    yield put(loadDBInfoRequest());
  }
}

export function* login(action: loginRequestType): Generator {
  try {
    const response = (yield call(
      api.login,
      action.payload.data
    )) as GQL.ISigninResponseDto;
    api.setTokens(response);
    api.setLicenseUrl(response.licenseApiUrl);
    try {
      const licenseToken = yield call(
        api.loginLicense,
        action.payload.data as LoginDTO
      );
      localStorage.setItem(
        'licenseToken',
        (licenseToken as AxiosResponse<{
          // eslint-disable-next-line camelcase
          access_token: string;
        }>).data.access_token
      );
      yield put(setIsSupervisor(true));
    } catch (e) {
      yield put(setIsSupervisor(false));
    }
    yield put(loginSuccess(response));
    yield put(pingSagaRequest());
  } catch (error) {
    api.clearAuthHeader();
    if (/network/i.test(error.message)) {
      toast('Não foi possível se conectar', { type: 'error' });
    }
    if (/login ou senha/i.test(error.message)) {
      toast('Credenciais inválidas', { type: 'error' });
    }
    if (/licença expirada/i.test(error.message)) {
      toast('Sua licença expirou', { type: 'error' });
    }
    if (/Failed to connect to /i.test(error.message)) {
      toast('O servidor não conseguiu se conectar com o serviço de licenças', {
        type: 'error',
      });
    }
  }
}

export function* logout(): Generator {
  try {
    yield call(api.licenseLogout);
  } catch (error) {
    toast(`Erro ao sair: ${error.message}`);
  } finally {
    yield call(persistor.purge);
  }
}

export function* setTokens(): Generator {
  const user = (yield select(getUser)) as GQL.ISigninResponseDto;
  if (user) {
    api.setTokens(user);
    api.setLicenseUrl(user.licenseApiUrl);
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setTokens), // action do redux-persist
  takeLatest(DbInfoTypes.LOAD_REQUEST, loadDBInfo),
  takeLatest(LoginTypes.LOAD_REQUEST, login),
  takeLeading(LogoutTypes.REQUEST, logout),
]);
