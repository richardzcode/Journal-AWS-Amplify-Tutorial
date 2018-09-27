import { combineReducers } from 'redux';

import { SWITCH_USER, UPDATE_PROFILE, DELETE_PROFILE } from './actions';

function user(state={}, action) {
  switch(action.type) {
    case SWITCH_USER:
      return action.user;
    default:
      return state;
  }
}

function profile(state={}, action) {
  switch(action.type) {
    case UPDATE_PROFILE:
      return Object.assign(
        {},
        state,
        action.profile
      );
    case DELETE_PROFILE:
      return null;
    default:
      return state;
  }
}

const Journal = combineReducers({
  user,
  profile
});

export default Journal;
