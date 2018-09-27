import React, { Component } from 'react';
import { Button } from 'bootstrap-4-react';
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('JSignOut');

export default class JSignOut extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    Auth.signOut()
      .then(() => logger.info('sign out success'))
      .catch(err => logger.info('sign out error', err));
  }

  render() {
    return (
      <Button
        light
        outline
        sm
        border="0"
        style={{ textDecoration: 'underline' }}
        onClick={this.signOut}
      >
        Sign Out
      </Button>
    )
  }
}
