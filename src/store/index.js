import {
  OPEN_FILE,
} from '../constants';

const initialContent = {
  content: null
};

export function content(state = initialContent, action) {
  switch (action.type) {
  case OPEN_FILE:
    return {content: action.content};
  default:
    return state;
  }
}

