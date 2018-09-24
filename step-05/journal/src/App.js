import React, { Component } from 'react';
import Amplify from 'aws-amplify';

import { Navigator, Main } from './components';
import './App.css';
import aws_exports from './aws-exports';

import store, { AmplifyBridge } from './store';

Amplify.Logger.LOG_LEVEL = 'INFO'; // We write INFO level logs throughout app
Amplify.configure(aws_exports);

new AmplifyBridge(store);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigator />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
