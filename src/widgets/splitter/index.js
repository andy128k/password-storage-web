import React from 'react';
import style from './style.css';

class Splitter extends React.Component {
  static displayName = 'Splitter';

  render() {
    return (
      <div className={style.splitter}>
        {React.Children.map(this.props.children, (child, index) =>
          <div className={style.panel} key={index}>{child}</div>)}
      </div>
    );
  }
}

export default Splitter;
