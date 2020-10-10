import React from 'react';
import style from './style.css';

class Row extends React.Component {
  static displayName = 'Row';

  render() {
    const {entry} = this.props;
    return (
      <div className={style.row} onClick={this.clicked}>
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
      <div className={style.tree}>
        {this.renderEntries(this.props.entries, 0)}
      </div>
    );
  }

  renderEntries(entries, level) {
    return entries.map((entry, key) => this.renderNode(entry, level, key));
  }

  renderNode(entry, level, key) {
    return (
      <div className={style.node + ' tree__node_level' + level} key={key}>
        <Row entry={entry} onClick={this.props.onClick} />
        {this.renderEntries(entry.children, level + 1)}
      </div>
    );
  }
}

export default Tree;
