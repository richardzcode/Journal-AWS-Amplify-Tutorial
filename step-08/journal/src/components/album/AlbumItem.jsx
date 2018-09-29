import React, { Component } from 'react';
import { BImg, BPre, BH5, BDiv } from 'bootstrap-4-react';
import { Storage, Logger } from 'aws-amplify';

const logger = new Logger('AlbumItem');

const Note = props => {
  const note = JSON.parse(props.json);
  return (
    <BPre mw="100" p="3" border rounded onClick={props.onClick}>
      <BH5>{note.subject}</BH5>
      <BDiv text="left" style={{ whiteSpace: 'pre-wrap' }}>
        {note.content}
      </BDiv>
    </BPre>
  )
}

export default class AlbumItem extends Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = { url: null, json: null }
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const { item } = this.props;
    if (item.key.endsWith('.json')) {
      Storage.get(item.key, { download: true })
        .then(data => this.loadJsonSuccess(data))
        .catch(err => this.loadError(err));
    } else {
      Storage.get(item.key)
        .then(url => this.loadImageSuccess(url))
        .catch(err => this.loadError(err));
    }
  }

  loadJsonSuccess(data) {
    logger.info('load album item success', data);
    this.setState({ json: data.Body.toString('utf8') });
  }

  loadImageSuccess(url) {
    logger.info('load album item success', url);
    this.setState({ url: url });
  }

  loadError(err) {
    logger.info('load album item error', err);
  }

  handleClick() {
    const { item, onClick } = this.props;
    if (onClick) {
      onClick(item.key);
    }
  }

  render() {
    const { url, json } = this.state;

    return (
      <React.Fragment>
        { json && <Note json={json} onClick={this.handleClick} /> }
        { url && <BImg src={url} mw="100" p="1" border rounded onClick={this.handleClick} /> }
      </React.Fragment>
    )
  }
}
