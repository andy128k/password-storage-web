import {
  OPEN_FILE,
  FILTER_ENTRIES,
} from '../constants';
import revelation from '../libs/revelation';

const initialContent = {
  content: null,
  entries: [],
  filteredEntries: null
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
  case OPEN_FILE:
    const password = prompt('Enter password');
    return {
      content: action.content,
      entries: revelation.read(action.content, password),
      filteredEntries: null
    };
  case FILTER_ENTRIES:
    if (action.query)
      return {
        content: state.content,
        entries: state.entries,
        filteredEntries: filterEntries(state.entries, satisfies(action.query))
      };
    else
      return {
        content: state.content,
        entries: state.entries,
        filteredEntries: null
      };
  default:
    return state;
  }
}

