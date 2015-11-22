import React from 'react';

class EntryView extends React.Component {
  render() {
    if (!this.props.entry)
      return React.DOM.div({className: 'entry-view'});

    const fields = Object.keys(this.props.entry).filter(k => k !== 'children' && k !== 'type');

    return React.DOM.div({className: 'entry-view'},
      fields.map(this.renderField, this)
    );
  }

  renderField(field) {
    return React.DOM.div({className: 'entry-view__row', key: field},
      React.DOM.div({className: 'entry-view__name'}, field),
      React.DOM.div({className: 'entry-view__value'}, this.props.entry[field])
    );
  }
}

EntryView.displayName = 'EntryView';

export default EntryView;

