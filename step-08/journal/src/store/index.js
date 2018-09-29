import { createStore } from 'redux';

import { updateProfile } from './actions';
import Journal from './reducers';

const store = createStore(Journal);

export default store;
export {
  updateProfile
}
export { default as AmplifyBridge } from './AmplifyBridge';
