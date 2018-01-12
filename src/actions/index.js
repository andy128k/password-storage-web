import {
  SET_FILE,
  SET_ERROR,
  FILTER_ENTRIES,
  SHOW_ENTRY,
} from '../constants';

export function setFile(content, filename, entries) {
  return { type: SET_FILE, content, filename, entries };
}

export function setError(error) {
  return { type: SET_ERROR, error };
}

export function filterEntries(query) {
  return { type: FILTER_ENTRIES, query };
}

export function showEntry(entry) {
  return { type: SHOW_ENTRY, entry };
}
