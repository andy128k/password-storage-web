import {
  OPEN_FILE,
  FILTER_ENTRIES,
} from '../constants';

export function openFile(content) {
  return { type: OPEN_FILE, content };
}

export function filterEntries(query) {
  return { type: FILTER_ENTRIES, query };
}

