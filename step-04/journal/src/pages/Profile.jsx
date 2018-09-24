import React, { Component } from 'react';
import { Auth, Logger } from 'aws-amplify';
import { Container, Form, InputGroup, Button, Alert } from 'bootstrap-4-react';

const logger = new Logger('Profile');

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.state = { profile: {given_name: '', family_name: ''} };
  }

  componentDidMount() {
    if (this.props.user) { this.loadProfile() }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      this.loadProfile();
    }
  }

  handleInputChange(name, value) {
    const profile = Object.assign({}, this.state.profile);
    profile[name] = value;
    this.setState({ profile: profile });
  }

  loadProfile() {
    const { user } = this.props;
    Auth.userAttributes(user)
      .then(data => this.loadSuccess(data))
      .catch(err => this.handleError(err));
  }

  saveProfile() {
    const { user } = this.props;
    if (!user) {
      this.handleError('No user to save to');
      return;
    }

    Auth.updateUserAttributes(user, this.state.profile)
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

  render() {
    const { profile, error } = this.state;

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
