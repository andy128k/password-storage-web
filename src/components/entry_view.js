import React from 'react';

class EntryView extends React.Component {
  static displayName = 'EntryView';

  render() {
    if (!this.props.entry)
      return <div className={'entry-view'} />;

    const fields = Object.keys(this.props.entry).filter(k => k !== 'children' && k !== 'type');

    return (
      <div className={'entry-view'}>
        {fields.map(this.renderField, this)}
      </div>
    );
  }

  renderField(field) {
    return (
      <div className={'entry-view__row'} key={field}>
        <div className={'entry-view__name'}>{field}</div>
        <div className={'entry-view__value'}>{this.props.entry[field]}</div>
      </div>
    );
  }
}

export default EntryView;
