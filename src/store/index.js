import {
  OPEN_FILE,
} from '../constants';
import revelation from '../libs/revelation';

const initialContent = {
  content: null,
  rawContent: null
};

export function content(state = initialContent, action) {
  switch (action.type) {
  case OPEN_FILE:
    return {
      content: action.content,
      rawContent: revelation.read(action.content, '****************************************************')
    };
  default:
    return state;
  }
}

