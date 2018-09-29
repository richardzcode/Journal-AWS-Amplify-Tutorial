import React, { Component } from 'react';
import { Card, Form, Button } from 'bootstrap-4-react';
import { Storage, Logger } from 'aws-amplify';

const logger = new Logger('NoteEditor');

export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.loadNote = this.loadNote.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      subject: '',
      content: '',
      s3Key: props.s3Key || ''
    };
  }

  componentDidMount() {
    this.loadNote();
  }

  loadNote() {
    const { s3Key } = this.state;
    if (!s3Key) { return; }

    Storage.get(s3Key, { download: true })
      .then(data => this.loadNoteSuccess(data))
      .catch(err => this.loadNoteError(err));
  }

  loadNoteSuccess(data) {
    logger.info('load note success', data);
    const json = data.Body.toString('utf8');
    const note = JSON.parse(json);
    this.setState(note);
  }

  loadNoteError(err) {
    logger.info('load note error', err);
  }

  handleSave() {
    const { subject, content } = this.state;
    const note = { subject, content };
    logger.info('saving note', note);

    const key = this.getS3Key();
    Storage.put(key, JSON.stringify(note), { contentType: 'application/json' })
      .then(data => this.uploadNoteSuccess(data))
      .catch(err => this.uploadNoteError(err));
  }

  uploadNoteSuccess(data) {
    logger.info('upload note success', data);
    this.setState({ s3Key: data.key });
    const { onUploaded } = this.props;
    if (onUploaded) { onUploaded(data.key); }
  }

  uploadNoteError(err) {
    logger.info('upload note error', err);
  }

  getS3Key() {
    if (this.state.s3Key) { return this.state.s3Key; }

    return this.props.path + new Date().getTime() + '.json';
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
            value={this.state.subject}
            onChange={event => this.setState({subject: event.target.value})}
          />
          <Form.Textarea
            w="100"
            placeholder="Content"
            rounded="0"
            value={this.state.content}
            onChange={event => this.setState({content: event.target.value})}
          />
        </Card.Body>
        <Card.Footer>
          <Button dark onClick={this.handleSave}>Save a note</Button>
        </Card.Footer>
      </Card>
    )
  }
}
