import React from 'react';
import { connect } from 'react-redux';
import { openFile, filterEntries, showEntry } from '../actions';
import FileInput from '../widgets/file_input';
import Splitter from '../widgets/splitter';
import Search from './search';
import Tree from './tree';
import EntryView from './entry_view';

class App extends React.Component {
  static displayName = 'App';

  render() {
    return (
      <div className={'app'}>
        <div className={'app__toolbar'}>
          <FileInput onChange={this.props.openFile} />

          {this.props.content ?
            <Search query={this.props.searchQuery} onSearch={this.props.filterEntries} /> :
            null}
        </div>
        <div className={'app__content'}>
          <Splitter>
            <Tree entries={this.props.filteredEntries || this.props.entries} onClick={this.props.showEntry} />
            <EntryView entry={this.props.currentEntry} />
          </Splitter>
        </div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

const actions = {
  openFile,
  filterEntries,
  showEntry
};

export default connect(select, actions)(App);
