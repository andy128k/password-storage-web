import { SET_FILE } from "../constants";

export function setFile(content, filename, entries) {
  return { type: SET_FILE, content, filename, entries };
}
