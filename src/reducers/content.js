import { useSelector } from "react-redux";

const initialState = {
  files: [],
};

const OPEN_FILE = "OPEN_FILE";

export function openFile(file) {
  return { type: OPEN_FILE, file };
}

export function useFiles() {
  return useSelector((state) => state.files);
}

export function useFile(fileId) {
  const files = useSelector((state) => state.files);
  return files.find((file) => file.id === fileId);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_FILE: {
      return {
        ...state,
        files: [...state.files, action.file],
      };
    }
    default:
      return state;
  }
}
