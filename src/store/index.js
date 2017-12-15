import {
  OPEN_FILE,
  FILTER_ENTRIES,
  SHOW_ENTRY,
} from '../constants';
import revelation from '../libs/revelation';

const initialContent = {
  filename: null,
  content: null,
  entries: [],
  searchQuery: '',
  filteredEntries: null,
  currentEntry: null
};

function satisfies(query) {
  query = query.toLowerCase();
  return entry => {
    for (let key in entry) {
      if (key !== 'children' &&
          entry.hasOwnProperty(key) &&
          entry[key].toLowerCase().indexOf(query) >= 0) {
        return true;
      }
    }
    return false;
  };
}

const identity = v => v;

function filterEntries(entries, predicate) {
  return entries.map(entry => filterEntry(entry, predicate)).filter(identity);
}

function filterEntry(entry, predicate) {
  const children = filterEntries(entry.children, predicate);
  if (children.length || predicate(entry)) {
    return Object.assign({}, entry, {children});
  } else {
    return null;
  }
}

export function content(state = initialContent, action) {
  switch (action.type) {
  case OPEN_FILE: {
    const password = prompt('Enter password');
    return Object.assign({}, initialContent, {
      filename: action.filename,
      content: action.content,
      entries: revelation.read(action.content, password),
    });
  }
  case FILTER_ENTRIES:
    return Object.assign({}, state, {
      searchQuery: action.query,
      filteredEntries: action.query ? filterEntries(state.entries, satisfies(action.query)) : null,
      currentEntry: null
    });
  case SHOW_ENTRY:
    return Object.assign({}, state, {
      currentEntry: action.entry
    });
  default:
    return state;
  }
}

