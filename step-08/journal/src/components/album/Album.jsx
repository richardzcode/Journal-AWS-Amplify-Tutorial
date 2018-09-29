import React, { Component } from 'react';
import { Card, Modal, Button, BDiv } from 'bootstrap-4-react';
import { Storage, Logger } from 'aws-amplify';

import AlbumItem from './AlbumItem';
import FilePicker from './FilePicker';
import NoteEditor from './NoteEditor';

const logger = new Logger('Album');

const Cell = props => (
  <Card p="1" style={{ maxHeight: "24rem", overflow: "auto" }} {...props}>
    {props.children}
  </Card>
)

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.handleUploaded = this.handleUploaded.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

    this.state = { items: [], editorS3Key: null }
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const { path } = this.props;
    Storage.list(path)
      .then(data => this.loadSuccess(data))
      .catch(err => this.loadError(err));
  }

  loadSuccess(data) {
    logger.info('load album success', data);
    this.setState({ items: data });
  }

  loadError(err) {
    logger.info('load album error', err);
  }

  handleUploaded(key) {
    this.load();
  }

  handleItemClick(key) {
    if (key.endsWith('.json')) {
      this.confirmKey = key;
      window.$('#confirmEdit').modal();
    }
  }

  editNote() {
    window.$('#confirmEdit').modal('hide');
    this.setState({ editorS3Key: this.confirmKey });
  }

  deleteNote() {
    window.$('#confirmEdit').modal('hide');
    Storage.remove(this.confirmKey)
      .then(() => {
        this.confirmKey = null;
        this.setState({ editorS3Key: this.confirmKey });
      })
      .catch(err => logger.info('delete note error', err));
  }

  render() {
    const { path } = this.props;
    const { items, editorS3Key } = this.state;

    return (
      <React.Fragment>
        <Card.Columns style={{ columnCount: 2 }}>
          { items.map(item => {
            return (
              <Cell key={item.key}>
                <AlbumItem item={item} onClick={this.handleItemClick} />
              </Cell>
            )
          })}
        </Card.Columns>
        <BDiv py="3">
          <FilePicker path={path} onUploaded={this.handleUploaded} />
        </BDiv>
        <BDiv py="3">
          <NoteEditor
            key={editorS3Key || '__'}
            path={path}
            s3Key={editorS3Key}
            onUploaded={this.handleUploaded}
          />
        </BDiv>
        <Modal id="confirmEdit" fade>
          <Modal.Dialog>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Confirm</Modal.Title>
                <Modal.Close>
                  <span aria-hidden="true">&times;</span>
                </Modal.Close>
              </Modal.Header>
              <Modal.Body>
                Edit or delete the item?
              </Modal.Body>
              <Modal.Footer>
                <Button primary onClick={this.editNote}>Edit</Button>
                <Button primary onClick={this.deleteNote}>Delete</Button>
                <Button secondary data-dismiss="modal">Cancel</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Dialog>
        </Modal>
      </React.Fragment>
    )
  }
}
