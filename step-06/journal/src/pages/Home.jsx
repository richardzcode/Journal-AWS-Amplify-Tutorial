import React, { Component } from 'react';

import { Unexpected, Unauthorized } from '../components';
import { Album } from '../components/album';

const today = () => {
  const dt = new Date();
  return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
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
