import React, { Component } from 'react';
import { Container } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Auth, Hub, Logger } from 'aws-amplify';

import { Home, Login } from '../pages';

const logger = new Logger('Main');

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'main');

    this.state = { user: null }
  }

  componentDidMount() {
    this.loadUser();
  }

  onHubCapsule(capsule) {
    logger.info('on Auth event', capsule);
    this.loadUser();
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user: user }))
      .catch(err => this.setState({ user: null }));
  }

  render() {
    const { user } = this.state;

    return (
      <Container as="main" role="main">
        <div className="starter-template">
          <HashRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <Home user={user} />}
              />
              <Route
                exact
                path="/login"
                render={(props) => <Login user={user} />}
              />
            </Switch>
          </HashRouter>
        </div>
      </Container>
    )
  }
}
