import React from 'react';
import { connect } from 'react-redux';
import { openFile, filterEntries, showEntry } from '../actions';
import FileInput from '../widgets/file_input';
import Splitter from '../widgets/splitter';
import Search from './search';
import Tree from './tree';
import EntryView from './entry_view';

class App extends React.Component {
  render() {
    return React.DOM.div({className: 'app'},
      React.DOM.div({className: 'app__toolbar'},
        React.createElement(FileInput, {onChange: this.fileChanged.bind(this)}),
        React.createElement(Search, {onSearch: this.onSearch.bind(this)})
      ),
      React.DOM.div({className: 'app__content'},
        React.createElement(Splitter, null,
          React.createElement(Tree, {entries: this.props.filteredEntries || this.props.entries, onClick: this.entryClicked.bind(this)}),
          React.createElement(EntryView, {entry: this.props.currentEntry})
        )
      )
    );
  }

  fileChanged(file) {
    this.props.dispatch(openFile(file));
  }

  onSearch(query) {
    this.props.dispatch(filterEntries(query));
  }

  entryClicked(entry) {
    this.props.dispatch(showEntry(entry));
  }
}

function select(state) {
  return state;
}

export default connect(select)(App);

