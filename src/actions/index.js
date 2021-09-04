import {
  SET_FILE,
  SET_ERROR,
} from '../constants';

export function setFile(content, filename, entries) {
  return { type: SET_FILE, content, filename, entries };
}

export function setError(error) {
  return { type: SET_ERROR, error };
}
