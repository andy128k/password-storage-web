import {
  OPEN_FILE,
} from '../constants';

export function openFile(content) {
  return { type: OPEN_FILE, content };
}

