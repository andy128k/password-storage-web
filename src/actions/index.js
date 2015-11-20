import {
  OPEN_FILE,
  FILTER_ENTRIES,
  SHOW_ENTRY,
} from '../constants';

export function openFile(content) {
  return { type: OPEN_FILE, content };
}

export function filterEntries(query) {
  return { type: FILTER_ENTRIES, query };
}

export function showEntry(entry) {
  return { type: SHOW_ENTRY, entry };
}

