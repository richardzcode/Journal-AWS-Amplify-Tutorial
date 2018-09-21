import React, { Component } from 'react';

import { Navigator, Main } from './components';
import './App.css';

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
