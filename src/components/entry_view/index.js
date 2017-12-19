import React from 'react';
import style from './style.css';

class EntryField extends React.Component {
  static displayName = 'EntryField';

  render() {
    const {field, value} = this.props;
    return (
      <div className={style.row}>
        <div className={style.name}>{field}</div>
        <div className={style.value}>{value}</div>
      </div>
    );
  }
}

class EntryView extends React.Component {
  static displayName = 'EntryView';

  render() {
    const {entry} = this.props;
    const fields = entry ? Object.keys(entry).filter(k => k !== 'children' && k !== 'type') : [];

    return (
      <div className={style.entryView}>
        {fields.map(field => <EntryField key={field} field={field} value={entry[field]} />)}
      </div>
    );
  }
}

export default EntryView;
