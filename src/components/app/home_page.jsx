import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../../contexts/content";
import { generateId } from "../../libs/generate_id";
import { readRevelationFile } from "../../libs/revelation";
import { FileInput } from "../../widgets/file_input";
import { FileLink } from "../../widgets/file_link";
import { Page } from "../../widgets/page";
import { AskPassword } from "../ask_password";

export const HomePage = () => {
  const [openingFile, setOpeningFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { files, addFile } = useContent();

  const handleOpen = useCallback((content, filename) => {
    setOpeningFile({ content, filename });
  }, []);

  const handleEnterPassword = useCallback(
    (password) => {
      try {
        const { content, filename } = openingFile;
        const entries = readRevelationFile(content, password);
        const fileId = generateId();
        const file = { id: fileId, content, filename, entries };
        addFile(file);
        setOpeningFile(null);
        setError(null);
        navigate(`/file/${fileId}`);
      } catch (error) {
        setError(error);
      }
    },
    [addFile, openingFile, navigate],
  );

  const handleCancel = useCallback(() => {
    setOpeningFile(null);
    setError(null);
  }, []);

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
