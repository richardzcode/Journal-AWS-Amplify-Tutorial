import React, { Component } from 'react';
import { Lead, BSpan } from 'bootstrap-4-react';
import { Auth } from 'aws-amplify';

export default class Home extends Component {
  render() {
    const { user } = this.props;

    if (user) {
      Auth.userAttributes(user)
        .then(attributes => console.log('attributes', attributes))
        .catch(err => console.log('attributes error', err));
    }

    return (
      <React.Fragment>
        <h1>Home</h1>
        { user && <Lead>You are signed in as  <BSpan font="italic">{user.username}</BSpan>.</Lead> }
      </React.Fragment>
    )
  }
}
