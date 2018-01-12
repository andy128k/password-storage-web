import React from 'react';
import style from './style.css';

class ErrorPanel extends React.Component {
  static displayName = 'ErrorPanel';

  render() {
    const {error} = this.props;
    return error ? <div className={style.panel}>{error.toString()}</div> : null;
  }
}

export default ErrorPanel;
