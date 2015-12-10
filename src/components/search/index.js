import React from 'react';
import {form, label, entry} from './style.css';

class Search extends React.Component {
  render() {
    const id = 'search-' + Math.random().toString(36).substring(5);

    return (
      <form className={form} onSubmit={this.onSubmit.bind(this)}>
        <label className={label} htmlFor={id}>Search:</label>
        <input className={entry} id={id} ref='q'/>
      </form>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.onSearch)
      this.props.onSearch(this.refs.q.value);
  }
}

Search.displayName = 'Search';

export default Search;

