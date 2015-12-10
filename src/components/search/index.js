import React from 'react';
import {form, label, entry, reset} from './style.css';

class Search extends React.Component {
  render() {
    const id = 'search-' + Math.random().toString(36).substring(5);

    return (
      <div className={form}>
        <label className={label} htmlFor={id}>Search:</label>
        <input className={entry} id={id} value={this.props.query} onChange={this.queryChanged.bind(this)}/>
        <button className={reset} onClick={this.reset.bind(this)}>Reset</button>
      </div>
    );
  }

  queryChanged(event) {
    if (this.props.onSearch)
      this.props.onSearch(event.target.value);
  }

  reset(event) {
    event.preventDefault();
    if (this.props.onSearch)
      this.props.onSearch('');
  }
}

Search.displayName = 'Search';

export default Search;

