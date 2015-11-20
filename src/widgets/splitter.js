import React from 'react';

class Splitter extends React.Component {
  render() {
    return React.DOM.div({className: 'splitter'},
      React.Children.map(this.props.children, (child, index) =>
        React.DOM.div({className: 'splitter__panel', key: index}, child))
    );
  }
}

Splitter.displayName = 'Splitter';

export default Splitter;

