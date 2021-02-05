import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const PersistReducer = persistReducer({ storage, key: 'login' }, rootReducer);
const store: Store<SRCWEB.ApplicationState> = createStore(
  PersistReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
