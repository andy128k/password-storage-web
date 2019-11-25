import React from 'react';
import style from './style.css';

const EntryField = ({field, value}) => (
  <div className={style.row}>
    <div className={style.name}>{field}</div>
    <div className={style.value}>{value}</div>
  </div>
);

const EntryView = ({entry}) => {
  const fields = entry ? Object.keys(entry).filter(k => k !== 'children' && k !== 'type') : [];
  return (
    <div className={style.entryView}>
      {fields.map(field => <EntryField key={field} field={field} value={entry[field]} />)}
    </div>
  );
};

export default EntryView;
