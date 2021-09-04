import { take, put } from 'redux-saga/effects';
import { setFile, setError } from '../actions/index';
import revelation from '../libs/revelation';

const OPEN_FILE_BEGIN = 'OPEN_FILE_BEGIN';
  
export function openFile(content, filename, history) {
  return { type: OPEN_FILE_BEGIN, content, filename, history };
}

export function* openFileSaga() {
  for (; ;) {
    const {content, filename, history} = yield take('OPEN_FILE_BEGIN');

    const password = prompt('Enter password');

    try {
      const entries = revelation.read(content, password);
      yield put(setFile(content, filename, entries));
      history.push('/file');
    } catch (error) {
      yield put(setError(error));
    }
  }
}
