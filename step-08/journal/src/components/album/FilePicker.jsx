import React, { Component } from 'react';
import { Form, Button } from 'bootstrap-4-react';
import { Storage, Logger } from 'aws-amplify';

const logger = new Logger('FilePicker');

const style = {
  position: 'relative',
  height: '3rem',
  button: {
    width: '100%',
    height: '100%',
    display: 'inline-block',
    position: 'absolute',
    left: 0,
    top: 0
  },
  file: {
    width: '100%',
    height: '100%',
    display: 'inline-block',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
    cursor: 'pointer'
  }
}

export default class FilePicker extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const file = event.target.files[0];
    logger.info('picked file', file);
    // Clear file input
    window.document.getElementById('fileInputForm').reset();

    this.uploadFile(file);
  }

  uploadFile(file) {
    const { path } = this.props;
    if (!path) {
      logger.warn('missing path property for FilePicker');
      return;
    }

    const key = this.calcS3Key(file);
    const { type } = file;
    Storage.put(key, file, { contentType: type })
      .then(data => this.uploadFileSuccess(data))
      .catch(err => this.uploadFileError(err));
  }

  uploadFileSuccess(data) {
    logger.info('upload file success', data);
    const { onUploaded } = this.props;
    if (onUploaded) { onUploaded(data.key); }
  }

  uploadFileError(err) {
    logger.info('upload file error', err);
  }

  calcS3Key(file) {
    return this.props.path + encodeURI(file.name).replace(/\s/g, '_');
  }

  render() {
    return (
      <div style={style}>
        <Form id="fileInputForm">
          <Button dark style={style.button}>Pick a file</Button>
          <Form.File
            accept="image/*"
            style={style.file}
            onChange={this.handleChange}
          />
        </Form>
      </div>
    )
  }
}
