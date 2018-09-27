import React, { Component } from 'react';

import { Unexpected, Unauthorized } from '../components';
import { Album } from '../components/album';

const padding = n => {
  return n > 9 ? n : '0' + n;
}

const today = () => {
  const dt = new date();
  return [
    dt.getfullyear(),
    padding(dt.getmonth() + 1),
    padding(dt.getdate())
  ].join('-');
}

const album_path = user_id => {
  return user_id + '/' + today() + '/';
}

export default class Home extends Component {
  render() {
    const { user } = this.props;

    if (!user) { return <Unauthorized /> }
    if (!user.id) { return <Unexpected /> }

    return (
      <React.Fragment>
        <Album path={album_path(user.id)} />
      </React.Fragment>
    )
  }
}
