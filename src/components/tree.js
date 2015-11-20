import React from 'react';

class TreeNode extends React.Component {
  render() {
    return React.DOM.div({className: 'tree-node tree-node_level' + this.props.level},
      this.props.entry.name,
      this.props.entry.children.map((entry, key) =>
        React.createElement(TreeNode, {key, entry, level: this.props.level + 1}))
    );
  }
}

TreeNode.displayName = 'TreeNode';

class Tree extends React.Component {
  render() {
    return React.DOM.div({className: 'tree'},
      this.props.entries.map((entry, key) =>
        React.createElement(TreeNode, {key, entry, level: 0}))
    );
  }
}

Tree.displayName = 'Tree';

export default Tree;

