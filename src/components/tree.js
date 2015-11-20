import React from 'react';

class Tree extends React.Component {
  render() {
    return React.DOM.div({className: 'tree'},
      this.renderEntries(this.props.entries, 0)
    );
  }

  renderEntries(entries, level) {
    return entries.map((entry, key) => this.renderNode(entry, level, key));
  }

  renderNode(entry, level, key) {
    return React.DOM.div({className: 'tree__node tree__node_level' + level, key},
      this.renderRow(entry),
      this.renderEntries(entry.children, level + 1)
    );
  }

  renderRow(entry) {
    return React.DOM.div({className: 'tree__row', onClick: this.props.onClick.bind(null, entry)},
      entry.name
    );
  }
}

Tree.displayName = 'Tree';

export default Tree;

