import React from 'react';

class Splitter extends React.Component {
  render() {
    return (
      <div className='splitter'>
        {React.Children.map(this.props.children, (child, index) =>
          <div className='splitter__panel' key={index}>{child}</div>)}
      </div>
    );
  }
}

Splitter.displayName = 'Splitter';

export default Splitter;
