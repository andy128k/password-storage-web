import React from 'react';
import style from './style.css';

class FileInput extends React.Component {
  static displayName = 'FileInput';

  state = {
    value: null
  };

  render() {
    return (
      <div className={style.block}>
        <input type='file' className={style.input} onChange={this.fileChanged} />
        <div>{this.renderLabel()}</div>
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
