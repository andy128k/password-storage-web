import React from 'react';


const style = {
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
  static displayName = 'FileInput';

  state = {
    value: null
  };

  render() {
    return (
      <div className='file-input' style={style.block}>
        <input type='file' style={style.input} onChange={this.fileChanged} />
        <div className={'file-input__label'}>{this.renderLabel()}</div>
      </div>
    );
  }

  fileChanged = (event) => {
    const filename = event.target.value;
    this.setState({value: filename});

    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = event => this.props.onChange(event.target.result, filename);
      reader.readAsArrayBuffer(file);
    } else {
      this.props.onChange(null, null);
    }
  };

  renderLabel() {
    if (this.props.label) {
      return this.props.label(this.state.value);
    } else {
      return this.state.value || 'Drop file here or click to browse';
    }
  }
}

export default FileInput;
