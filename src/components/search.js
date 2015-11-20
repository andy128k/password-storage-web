import React from 'react';

class Search extends React.Component {
  render() {
    return React.DOM.form({className: 'search', onSubmit: this.onSubmit.bind(this)},
      React.DOM.input({className: 'search__entry', ref: 'q'})
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

