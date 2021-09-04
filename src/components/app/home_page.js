import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { openFile } from '../../sagas/open_file';
import { Page } from '../../widgets/page';
import { FileInput } from '../../widgets/file_input';
import ErrorPanel from '../../widgets/error_panel';

export const HomePage = () => {
  const history = useHistory();
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();
  const handleOpen = useCallback((content, filename) => {
    dispatch(openFile(content, filename, history));
  }, [dispatch, history]);
  return (
    <Page>
      <ErrorPanel error={error} />
      <FileInput onOpen={handleOpen} />
    </Page>
  );
};
