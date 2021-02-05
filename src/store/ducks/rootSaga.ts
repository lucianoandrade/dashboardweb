import { all } from 'redux-saga/effects';
import chat from './chat/sagas';
import gruop from './groups/sagas';
import license from './license/sagas';
import login from './login/sagas';
import operators from './operators/sagas';
import analytic from './analytic/sagas';

export default function* rootSaga(): Generator {
  yield all([license, login, gruop, chat, operators, analytic]);
}
