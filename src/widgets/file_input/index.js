import React, { useCallback } from 'react';
import style from './style.css';

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = event => resolve(event.target.result);
    reader.readAsArrayBuffer(file);
  });
}

export const FileInput = ({onOpen}) => {
  const fileChanged = useCallback(async (event) => {
    const file = event.target.files[0];
    const filename = event.target.value;
    event.target.value = null;

    if (file) {
      const content = await readFile(file);
      onOpen(content, filename);
    }
  }, [onOpen]);

  return (
    <div className={style.block}>
      <input type='file' className={style.input} title=" " onChange={fileChanged} />
      Open file...
    </div>
  );
};
