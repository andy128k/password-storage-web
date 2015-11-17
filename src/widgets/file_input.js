import React from 'react';


let style = {
  block: {
    position: 'relative'
  },
  input: {
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  }
};


class FileInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null
    };
  }

  render() {
    return React.DOM.div({className: 'file-input', style: style.block},
      React.DOM.input({type: 'file', style: style.input, onChange: this._fileChanged.bind(this)}),
      React.DOM.div({className: 'file-input__label'}, this._renderLabel())
    );
  }

  _fileChanged(event) {
    this.setState({value: event.target.value});

    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = event => this.props.onChange(event.target.result);
      reader.readAsArrayBuffer(file);
    } else {
      this.props.onChange(null);
    }
  }

  _renderLabel() {
    if (this.props.label) {
      return this.props.label(this.state.value);
    } else {
      return this.state.value || 'Drop file here or click to browse';
    }
  }
}

FileInput.displayName = 'FileInput';

export default FileInput;

