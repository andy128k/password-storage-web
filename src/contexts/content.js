import React, { useState, useCallback, useContext } from "react";

const Content = React.createContext();

export const ContentProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  return (
    <Content.Provider value={{ files, setFiles }}>{children}</Content.Provider>
  );
};

export function useContent() {
  const { files, setFiles } = useContext(Content);
  const addFile = useCallback(
    (file) => {
      setFiles((files) => [...files, file]);
    },
    [setFiles],
  );
  return {
    files,
    addFile,
  };
}

export function useFile(fileId) {
  const { files } = useContent();
  return files.find((file) => file.id === fileId);
}
