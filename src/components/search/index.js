import React from 'react';
import {form, label, entry, reset} from './style.css';

class Search extends React.Component {
  static displayName = 'Search';

  id = 'search-' + Math.random().toString(36).substring(5);

  render() {
    return (
      <div className={form}>
        <label className={label} htmlFor={this.id}>Search:</label>
        <input className={entry} id={this.id} value={this.props.query} onChange={this.queryChanged}/>
        <button className={reset} onClick={this.reset}>Reset</button>
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
