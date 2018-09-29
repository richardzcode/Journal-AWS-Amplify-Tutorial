import React, { Component } from 'react';
import { Auth, Logger } from 'aws-amplify';
import { Container, Form, InputGroup, Button, Alert } from 'bootstrap-4-react';

import { Unexpected, Unauthorized } from '../components';
import store, { updateProfile } from '../store';

const logger = new Logger('Profile');

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.storeListener = this.storeListener.bind(this);

    const state = store.getState();
    this.state = { user: state.user, profile: state.profile };
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.storeListener);
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  handleInputChange(name, value) {
    const profile = Object.assign({}, this.state.profile);
    profile[name] = value;
    this.setState({ profile: profile });
  }

  saveProfile() {
    const { user, profile } = this.state;
    if (!user) {
      this.handleError('No user to save to');
      return;
    }

    Auth.updateUserAttributes(user, profile)
      .then(data => this.saveSuccess(data))
      .catch(err => this.handleError(err));
  }

  loadSuccess(data) {
    logger.info('loaded user attributes', data);
    const profile = this.translateAttributes(data);
    this.setState({ profile: profile });
  }

  saveSuccess(data) {
    logger.info('saved user profile', data);
    store.dispatch(updateProfile(this.state.profile));
  }

  handleError(error) {
    logger.info('load / save user attributes error', error);
    this.setState({ error: error.message || error });
  }

  // Auth.userAttributes returns an array of attributes.
  // We map it to an object for easy use.
  translateAttributes(data) {
    const profile = {};
    data
      .filter(attr => ['given_name', 'family_name'].includes(attr.Name))
      .forEach(attr => profile[attr.Name] = attr.Value);
    return profile;
  }

  storeListener() {
    logger.info('redux notification');
    const state = store.getState();
    logger.info('state from redux', state);
    this.setState({ user: state.user, profile: state.profile });
  }

  render() {
    const { user, profile, error } = this.state;

    if (!user) { return <Unauthorized /> }
    if (!user.id) { return <Unexpected /> }

    return (
      <Container display="flex" flex="column" alignItems="center">
        <InputGroup mb="3" style={{ maxWidth: '24rem' }}>
          <InputGroup.PrependText>First name</InputGroup.PrependText>
          <Form.Input
            type="text"
            defaultValue={profile.given_name}
            onChange={event => this.handleInputChange('given_name', event.target.value)}
          />
        </InputGroup>
        <InputGroup mb="3" style={{ maxWidth: '24rem' }}>
          <InputGroup.PrependText>Last name</InputGroup.PrependText>
          <Form.Input
            type="text"
            defaultValue={profile.family_name}
            onChange={event => this.handleInputChange('family_name', event.target.value)}
          />
        </InputGroup>
        <Button primary px="5" onClick={this.saveProfile}>Save</Button>
        { error && <Alert warning>{error}</Alert> }
      </Container>
    )
  }
}
