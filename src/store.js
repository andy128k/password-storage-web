import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import content from './reducers/content';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  content,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
