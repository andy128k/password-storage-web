import React from 'react';
import style from './style.css';

class Search extends React.Component {
  static displayName = 'Search';

  id = 'search-' + Math.random().toString(36).substring(5);

  render() {
    return (
      <div className={style.form}>
        <label className={style.label} htmlFor={this.id}>Search:</label>
        <input className={style.entry} id={this.id} value={this.props.query} onChange={this.queryChanged}/>
        <button className={style.reset} onClick={this.reset}>Reset</button>
      </div>
    );
  }

  queryChanged = (event) => {
    if (this.props.onSearch) {
      this.props.onSearch(event.target.value);
    }
  };

  reset = (event) => {
    event.preventDefault();
    if (this.props.onSearch) {
      this.props.onSearch('');
    }
  };
}

export default Search;
