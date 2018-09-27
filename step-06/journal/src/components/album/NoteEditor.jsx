import React, { Component } from 'react';
import { Card, Form, Button } from 'bootstrap-4-react';
import { Storage, Logger } from 'aws-amplify';

const logger = new Logger('NoteEditor');

export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.inputs = {
      subject: '',
      content: '',
      s3Key: props.s3Key || ''
    };
  }

  handleSave() {
    const { subject, content } = this.inputs;
    const note = { subject, content };
    logger.info('saving note', note);

    const key = this.getS3Key();
    Storage.put(key, JSON.stringify(note), { contentType: 'application/json' })
      .then(data => this.uploadNoteSuccess(data))
      .catch(err => this.uploadNoteError(err));
  }

  uploadNoteSuccess(data) {
    logger.info('upload note success', data);
    const { onUploaded } = this.props;
    if (onUploaded) { onUploaded(data.key); }
  }

  uploadNoteError(err) {
    logger.info('upload note error', err);
  }

  getS3Key() {
    if (!this.inputs.s3Key) {
      this.inputs.s3Key = this.props.path + new Date().getTime() + '.json';
    }
    return this.inputs.s3Key;
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Form.Input
            w="100"
            placeholder="Title"
            border="bottom-0"
            rounded="0"
            onChange={event => this.inputs.subject = event.target.value}
          />
          <Form.Textarea
            w="100"
            placeholder="Content"
            rounded="0"
            onChange={event => this.inputs.content = event.target.value}
          />
        </Card.Body>
        <Card.Footer>
          <Button dark onClick={this.handleSave}>Save a note</Button>
        </Card.Footer>
      </Card>
    )
  }
}
