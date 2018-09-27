import React, { Component } from 'react';
import { Card, BDiv } from 'bootstrap-4-react';
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

    this.state = { items: [] }
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

  render() {
    const { path } = this.props;
    const { items } = this.state;

    return (
      <React.Fragment>
        <Card.Columns style={{ columnCount: 2 }}>
          { items.map(item => {
            return (
              <Cell key={item.key}>
                <AlbumItem item={item} />
              </Cell>
            )
          })}
        </Card.Columns>
        <BDiv py="3">
          <FilePicker path={path} onUploaded={this.handleUploaded} />
        </BDiv>
        <BDiv py="3">
          <NoteEditor path={path} onUploaded={this.handleUploaded} />
        </BDiv>
      </React.Fragment>
    )
  }
}
