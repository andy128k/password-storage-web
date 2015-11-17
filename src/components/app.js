import React from 'react';
import { connect } from 'react-redux';
import { openFile } from '../actions';
import FileInput from '../widgets/file_input';

class App extends React.Component {
  render() {
    return React.DOM.div(null,
			 React.createElement(FileInput, {onChange: this.fileChanged.bind(this)}),
      React.DOM.div(null, this.props.content)
    );
  }

  fileChanged(file) {
    this.props.dispatch(openFile(file));
  }
}

//App.propTypes = {
//  content: React.PropTypes.string.isRequired
//};

function select(state) {
  return state;
}

export default connect(select)(App);

