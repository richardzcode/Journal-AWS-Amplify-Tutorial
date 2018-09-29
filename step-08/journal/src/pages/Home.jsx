import React, { Component } from 'react';

import { Unexpected, Unauthorized, WhichDay } from '../components';
import { Album } from '../components/album';

const padding = n => {
  return n > 9 ? n : '0' + n;
}

const today = () => {
  const dt = new Date();
  return [
    dt.getFullYear(),
    padding(dt.getMonth() + 1),
    padding(dt.getDate())
  ].join('-');
}

const album_path = (user_id, day) => {
  return user_id + '/' + day + '/';
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { day: today() }
  }

  render() {
    const { user } = this.props;
    const { day } = this.state;

    if (!user) { return <Unauthorized /> }
    if (!user.id) { return <Unexpected /> }

    return (
      <React.Fragment>
        <WhichDay rootPath={user.id + '/'} onDaySelected={day => this.setState({ day: day })} />
        <Album key={day} path={album_path(user.id, day)} />
      </React.Fragment>
    )
  }
}
