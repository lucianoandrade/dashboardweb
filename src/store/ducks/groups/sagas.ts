import { put, select, delay, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { loadGroupSuccess, loadGroupComparisonSuccess, GroupRequestTypes, GroupComparisonRequestTypes } from './actions';
import { getUserData, getComparisonData } from './selectors';
import { getUser } from '../login/selectors';
import { logoutRequest } from '../login/actions';

export function* getGroups(): Generator {
  while (yield select(getUser)) {
    try {
      const requestPayload = yield select(getUserData);
      const result = yield api.listGroups(
        requestPayload as GQL.IRequestListGroupDto
      );

      yield put(loadGroupSuccess(result as Array<Group>));
    } catch (error) {
      if (/unauthorized/i.test(error.message)) {
        yield put(logoutRequest());
      }
      if (yield select(getUser)) {
        toast('Erro ao carregar grupos', { type: 'error' });
      }
    }
    yield delay(30000);
  }
}
export function* getGroupComparison(): Generator {
  while (yield select(getUser)) {
    try {
      const requestPayload = yield select(getComparisonData);
      const result = yield api.getGroupComparison(
        requestPayload as GQL.IRequestComparativeGroup
      );

      yield put(loadGroupComparisonSuccess(result as Array<GroupComparison>));
    } catch (error) {
      if (/unauthorized/i.test(error.message)) {
        yield put(logoutRequest());
      }
      if (yield select(getUser)) {
        toast('Erro ao carregar comparativos', { type: 'error' });
      }
    }
    yield delay(30000);
  }
}

export default all([
  takeLatest(GroupRequestTypes.LOAD, getGroups),
  takeLatest(GroupComparisonRequestTypes.LOAD, getGroupComparison),
])