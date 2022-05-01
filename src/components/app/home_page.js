import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Page } from "../../widgets/page";
import { FileInput } from "../../widgets/file_input";
import { openFile, useFiles } from "../../reducers/content";
import { AskPassword } from "../ask_password";
import { readRevelationFile } from "../../libs/revelation";
import { generateId } from "../../libs/generate_id";
import { FileLink } from "../../widgets/file_link";

export const HomePage = () => {
  const [openingFile, setOpeningFile] = useState(null);
  const [error, setError] = useState(null);
  const files = useFiles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = useCallback(
    (content, filename) => {
      setOpeningFile({ content, filename });
    },
    [setOpeningFile]
  );

  const handleEnterPassword = useCallback(
    (password) => {
      try {
        const { content, filename } = openingFile;
        const entries = readRevelationFile(content, password);
        const fileId = generateId();
        const file = { id: fileId, content, filename, entries };
        dispatch(openFile(file));
        setOpeningFile(null);
        setError(null);
        navigate(`/file/${fileId}`);
      } catch (error) {
        setError(error);
      }
    },
    [dispatch, openingFile, setError, navigate]
  );

  const handleCancel = useCallback(() => {
    setOpeningFile(null);
    setError(null);
  }, [setOpeningFile]);

  return (
    <Page>
      <FileInput onOpen={handleOpen} />

      {files.map((file) => (
        <FileLink key={file.id} file={file} />
      ))}

      {openingFile ? (
        <AskPassword
          filename={openingFile.filename}
          error={error}
          onEnterPassword={handleEnterPassword}
          onCancel={handleCancel}
        />
      ) : null}
    </Page>
  );
};
