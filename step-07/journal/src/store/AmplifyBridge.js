import { Auth, Hub, Logger } from 'aws-amplify';

import { switchUser, updateProfile, deleteProfile } from './actions';

const logger = new Logger('AmplifyBridge');

export default class AmplifyBridge {
  constructor(store) {
    this.store = store;

    this.onHubCapsule = this.onHubCapsule.bind(this);
    Hub.listen('auth', this, 'AmplifyBridge'); // Add this component as a listener of auth events.

    this.checkUser(); // first check
  }

  onHubCapsule(capsule) {
    logger.info('on Auth event', capsule);
    this.checkUser(); // triggered every time user sign in / out
  }

  checkUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.checkUserSuccess(user))
      .catch(err => this.checkUserError(err));
  }

  loadUserInfo(user) {
    Auth.currentUserInfo()
      .then(info => this.loadUserInfoSuccess(user, info))
      .catch(err => this.loadUserInfoUserError(user, err));
  }

  loadProfile(user) {
    Auth.userAttributes(user)
      .then(data => this.loadProfileSuccess(data))
      .catch(err => this.loadProfileError(err));
  }

  checkUserSuccess(user) {
    logger.info('check user success', user);
    this.loadUserInfo(user); // Defer store.dispatch to loadUserInfo
    this.loadProfile(user);
  }

  checkUserError(err) {
    logger.info('check user error', err);
    this.store.dispatch(switchUser(null));
    this.store.dispatch(deleteProfile());
  }

  loadUserInfoSuccess(user, info) {
    logger.info('load user info success', user, info);
    Object.assign(user, info);
    this.store.dispatch(switchUser(user));
  }

  loadUserInfoError(user, err) {
    logger.info('load user info error', err);
    this.store.dispatch(switchUser(user)); // Still dispatchs user object
  }

  loadProfileSuccess(data) {
    logger.info('load profile success', data);
    const profile = this.translateAttributes(data);
    this.store.dispatch(updateProfile(profile));
  }

  loadProfileError(err) {
    logger.info('load profile error', err);
    this.store.dispatch(deleteProfile());
  }

  // Auth.userAttributes returns an array of attributes.
  // We map it to an object for easy use.
  translateAttributes(data) {
    const attributes = {};
    data
      .filter(attr => ['given_name', 'family_name'].includes(attr.Name))
      .forEach(attr => attributes[attr.Name] = attr.Value);
    return attributes;
  }
}

