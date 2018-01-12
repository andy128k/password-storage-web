import { all, fork } from 'redux-saga/effects';
import { openFileSaga } from './open_file';

export default function* rootSaga() {
  yield all([
    fork(openFileSaga)
  ]);
}
