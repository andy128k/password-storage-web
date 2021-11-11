import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Page } from '../../widgets/page';
import { FileInput } from '../../widgets/file_input';
import { setFile } from '../../actions';
import { AskPassword } from '../ask_password';
import revelation from '../../libs/revelation';

export const HomePage = () => {
  const [openingFile, setOpeningFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = useCallback((content, filename) => {
    setOpeningFile({content, filename});
  }, [dispatch, setOpeningFile]);

  const handleEnterPassword = useCallback(password => {
    try {
      const {content, filename} = openingFile;
      const entries = revelation.read(content, password);
      dispatch(setFile(content, filename, entries));
      setOpeningFile(null);
      setError(null);
      navigate('/file');
    } catch (error) {
      dispatch(setError(error));
    }
  }, [openingFile, setFile, setError, navigate]);

  const handleCancel = useCallback(() => {
    setOpeningFile(null);
    setError(null);
  }, [setOpeningFile]);

  return (
    <Page>
      <FileInput onOpen={handleOpen} />
      {openingFile ? <AskPassword filename={openingFile.filename} error={error} onEnterPassword={handleEnterPassword} onCancel={handleCancel} /> : null}
    </Page>
  );
};
