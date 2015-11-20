import React from 'react';

class TreeNode extends React.Component {
  render() {
    return React.DOM.div({className: 'tree__node tree__node_level' + this.props.level},
      this.renderRow(),
      this.props.entry.children.map((entry, key) =>
        React.createElement(TreeNode, {key, entry, level: this.props.level + 1, onClick: this.props.onClick}))
    );
  }

  renderRow() {
    return React.DOM.div({className: 'tree__row', onClick: this.props.onClick.bind(null, this.props.entry)},
      this.props.entry.name
    );
  }
}

TreeNode.displayName = 'TreeNode';

class Tree extends React.Component {
  render() {
    return React.DOM.div({className: 'tree'},
      this.props.entries.map((entry, key) =>
        React.createElement(TreeNode, {key, entry, level: 0, onClick: this.props.onClick}))
    );
  }
}

Tree.displayName = 'Tree';

export default Tree;

