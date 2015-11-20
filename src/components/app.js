import React from 'react';
import { connect } from 'react-redux';
import { openFile, filterEntries } from '../actions';
import FileInput from '../widgets/file_input';
import Search from './search';
import Tree from './tree';

class App extends React.Component {
  render() {
    return React.DOM.div(null,
      React.createElement(FileInput, {onChange: this.fileChanged.bind(this)}),
      React.createElement(Search, {onSearch: this.onSearch.bind(this)}),
      React.createElement(Tree, {entries: this.props.filteredEntries || this.props.entries})
    );
  }

  fileChanged(file) {
    this.props.dispatch(openFile(file));
  }

  onSearch(query) {
    this.props.dispatch(filterEntries(query));
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);

