import {
  SET_FILE,
  SET_ERROR,
  FILTER_ENTRIES,
  SHOW_ENTRY,
} from '../constants';

const initialContent = {
  filename: null,
  content: null,
  entries: [],
  searchQuery: '',
  filteredEntries: null,
  currentEntry: null,
  error: null,
};

function satisfies(query) {
  query = query.toLowerCase();
  return entry => {
    for (let key in entry) {
      if (key !== 'children' &&
          Object.prototype.hasOwnProperty.call(entry, key) &&
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
    return {...entry, children};
  } else {
    return null;
  }
}

export default function(state = initialContent, action) {
  switch (action.type) {
  case SET_FILE: {
    return {
      ...initialContent,
      filename: action.filename,
      content: action.content,
      entries: action.entries,
      error: null,
    };
  }
  case SET_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case FILTER_ENTRIES:
    return {
      ...state,
      searchQuery: action.query,
      filteredEntries: action.query ? filterEntries(state.entries, satisfies(action.query)) : null,
      currentEntry: null
    };
  case SHOW_ENTRY:
    return {
      ...state,
      currentEntry: action.entry
    };
  default:
    return state;
  }
}
