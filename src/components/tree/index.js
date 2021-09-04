import React from 'react';
import classNames from 'classnames';
import { Link } from "react-router-dom";
import style from './style.css';

const Row = ({entry}) => <Link to={`/entry/${entry.id}`} className={style.entryLink}>{entry.name}</Link>;

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
    const className = classNames({
      [style.nodeRow]: true,
      [style.nodeRow_current]: this.props.currentEntry?.id === entry.id,
    });
    const nodeStyle = {
      paddingLeft: level * 20,
    };
    return (
      <div className={style.node} key={key}>
        <div className={className} style={nodeStyle}>
          <Row entry={entry} />
        </div>
        {this.renderEntries(entry.children, level + 1)}
      </div>
    );
  }
}

export default Tree;
