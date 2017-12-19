import React from 'react';
import {tree, node, row} from './style.css';

class Row extends React.Component {
  static displayName = 'Row';

  render() {
    const {entry} = this.props;
    return (
      <div className={row} onClick={this.clicked}>
        {entry.name}
      </div>
    );
  }

  clicked = () => {
    const {entry, onClick} = this.props;
    onClick(entry);
  };
}

class Tree extends React.Component {
  static displayName = 'Tree';

  render() {
    return (
      <div className={tree}>
        {this.renderEntries(this.props.entries, 0)}
      </div>
    );
  }

  renderEntries(entries, level) {
    return entries.map((entry, key) => this.renderNode(entry, level, key));
  }

  renderNode(entry, level, key) {
    return (
      <div className={node + ' tree__node_level' + level} key={key}>
        <Row entry={entry} onClick={this.props.onClick} />
        {this.renderEntries(entry.children, level + 1)}
      </div>
    );
  }
}

export default Tree;
