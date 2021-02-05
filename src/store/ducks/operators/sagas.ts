import { put, select, delay, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import {
  loadOperatorSuccess,
  loadOperatorDetailsSuccess,
  loadOperatorComparisonSuccess,
  loadOperatorHistorySuccess,
  cleanSelectedOperator,
  OperatorRequestTypes,
  OperatorDetailsTypes,
  OperatorComparisonRequestTypes,
  OperatorViewTypes,
  OperatorHistoryTypes,
  loadOwnOperatorData,
  selectOperator,
} from './actions';
import {
  getOperatorsList,
  operatorHistorySelect,
  getOperatorDetail,
  currentOperatorView,
  OperatorData,
  isOperatorSelected,
} from './selectors';
import { isGroupSelected } from '../groups/selectors';
import { logoutRequest } from '../login/actions';
import { getUser } from '../login/selectors';

export function* getOperators(): Generator {
  while (yield select(isGroupSelected)) {
    try {
      const requestPayload = yield select(getOperatorsList);
      const result = yield api.getListOperatorsByGroup(
        requestPayload as GQL.IRequestListOperatorByGroup
      );

      yield put(loadOperatorSuccess(result as Operator[]));
    } catch (error) {
      if (/unauthorized/i.test(error.message)) {
        yield put(logoutRequest());
      }
      toast('Erro ao carregar operadores', { type: 'error' });
    }
    yield delay(30000);
  }
}

export function* getOperatorDetails(): Generator {
  while (yield select(isOperatorSelected)) {
    try {
      const requestPayload = yield select(getOperatorDetail);
      const result = yield api.getOperatorDetails(
        requestPayload as GQL.IRequestUserDetail
      );

      yield put(loadOperatorDetailsSuccess(result as GQL.IResponseUserDetail));
    } catch (error) {
      if (/unauthorized/i.test(error.message)) {
        yield put(logoutRequest());
      }
      if (yield select(isOperatorSelected)) {
        toast('Erro ao carregar grupos', { type: 'error' });
      }
    }
    yield delay(30000);
  }
}

export function* getOperatorHistory(): Generator {
  while (yield select(isOperatorSelected)) {
    try {
      const requestPayload = yield select(operatorHistorySelect);
      const payload = requestPayload as GQL.IRequestUserHistory;
      const result = yield api.getOperatorHistory(payload);
      yield put(loadOperatorHistorySuccess(result as GQL.IResponseUserHistory));
    } catch (error) {
      if (/unauthorized/i.test(error.message)) {
        yield put(logoutRequest());
      }
      if (yield select(isOperatorSelected)) {
        toast('Erro ao carregar histórico do operador', { type: 'error' });
      }
    }
    yield delay(30000);
  }
}

export function* getOperatorComparison(): Generator {
  while (yield select(isGroupSelected)) {
    try {
      const requestPayload = yield select(OperatorData);
      const payload = requestPayload as GQL.IRequestComparativeOperatorByGroup;
      if (payload.comparativeType !== 'Performance') {
        const result = yield api.getOperatorComparison(payload);

        yield put(
          loadOperatorComparisonSuccess(result as Array<OperatorComparison>)
        );
      }
    } catch (error) {
      if (yield select(isGroupSelected)) {
        toast('Erro ao carregar comparativos', { type: 'error' });
      }
    }
    yield delay(30000);
  }
}

export function* handleViewChange(): Generator {
  try {
    const view: any = yield select(currentOperatorView);
    if (!['details', 'history'].includes(view)) {
      yield put(cleanSelectedOperator());
    }
    return;
  } catch (error) {
    if (/unauthorized/i.test(error.message)) {
      yield put(logoutRequest());
    }
    toast('Erro ao carregar grupos', { type: 'error' });
  }
}

function* loadOwnOperatorDataSaga(): Generator {
  let user: unknown;
  while (yield select(getUser)) {
    try {
      user = yield select(getUser);
      const requestPayload = yield select(getOperatorsList);
      const result = yield api.getListOperatorsByGroup(
        requestPayload as GQL.IRequestListOperatorByGroup
      );

      yield put(
        selectOperator(
          (result as Array<Operator>).find(
            // eslint-disable-next-line no-loop-func
            (res) =>
              res.COD_RECUP === (user as GQL.ISigninResponseDto).COD_RECUP
          )
        )
      );
    } catch (error) {
      if (/unauthorized/i.test(error.message)) {
        yield put(logoutRequest());
      }
      toast('Erro ao carregar operador', { type: 'error' });
    }
    yield delay(30000);
  }
}

export default all([
  takeLatest(OperatorRequestTypes.LOAD, getOperators),
  takeLatest(OperatorDetailsTypes.LOAD, getOperatorDetails),
  takeLatest(OperatorComparisonRequestTypes.LOAD, getOperatorComparison),
  takeLatest(OperatorViewTypes.SETPAGEVIEW, handleViewChange),
  takeLatest(OperatorHistoryTypes.LOAD, getOperatorHistory),
  takeLatest(loadOwnOperatorData.request, loadOwnOperatorDataSaga),
]);
