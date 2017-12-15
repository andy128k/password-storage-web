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
    return (
      <div className={'app'}>
        <div className={'app__toolbar'}>
          <FileInput onChange={this.fileChanged} />

          {this.props.content ?
            <Search query={this.props.searchQuery} onSearch={this.onSearch} /> :
            null}
        </div>
        <div className={'app__content'}>
          <Splitter>
            <Tree entries={this.props.filteredEntries || this.props.entries} onClick={this.entryClicked} />
            <EntryView entry={this.props.currentEntry} />
          </Splitter>
        </div>
      </div>
    );
  }

  fileChanged = (fileContent, fileName) => {
    this.props.dispatch(openFile(fileContent, fileName));
  };

  onSearch = (query) => {
    this.props.dispatch(filterEntries(query));
  };

  entryClicked = (entry) => {
    this.props.dispatch(showEntry(entry));
  };
}

function select(state) {
  return state;
}

export default connect(select)(App);
