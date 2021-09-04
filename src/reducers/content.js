import {
  SET_FILE,
} from '../constants';

const initialContent = {
  filename: null,
  content: null,
  entries: [],
};

export default function(state = initialContent, action) {
  switch (action.type) {
  case SET_FILE: {
    return {
      ...initialContent,
      filename: action.filename,
      content: action.content,
      entries: action.entries,
    };
  }
  default:
    return state;
  }
}
