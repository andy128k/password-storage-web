import {
  SET_FILE,
  SET_ERROR,
} from '../constants';

const initialContent = {
  filename: null,
  content: null,
  entries: [],
  error: null,
};

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
  default:
    return state;
  }
}
