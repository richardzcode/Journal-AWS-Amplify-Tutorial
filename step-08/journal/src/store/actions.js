const SWITCH_USER = 'SWITCH_USER';

const UPDATE_PROFILE = 'UPDATE_PROFILE';
const DELETE_PROFILE = 'DELETE_PROFILE';

// when user sign in / out
function switchUser(user) {
  return {
    type: SWITCH_USER,
    user
  }
}

// when user updates profile
function updateProfile(profile) {
  return {
    type: UPDATE_PROFILE,
    profile
  }
}

// when user sign out
function deleteProfile() {
  return { type: DELETE_PROFILE }
}

export { SWITCH_USER, UPDATE_PROFILE, DELETE_PROFILE }
export { switchUser, updateProfile, deleteProfile }
