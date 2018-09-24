import React, { Component } from 'react';
import { Navbar, Nav, BSpan } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Auth, Hub, Logger } from 'aws-amplify';
import { JSignOut } from './auth';

const HomeItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/" active>
      Home
      <BSpan srOnly>(current}</BSpan>
    </Nav.ItemLink>
    <Nav.ItemLink href="#/profile">
      Profile
    </Nav.ItemLink>
    <Nav.ItemLink href="#/login">
      Login
    </Nav.ItemLink>
  </React.Fragment>
)

const LoginItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/">
      Home
    </Nav.ItemLink>
    <Nav.ItemLink href="#/profile">
      Profile
    </Nav.ItemLink>
    <Nav.ItemLink href="#/login" active>
      Login
      <BSpan srOnly>(current}</BSpan>
    </Nav.ItemLink>
  </React.Fragment>
)

const ProfileItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/">
      Home
    </Nav.ItemLink>
    <Nav.ItemLink href="#/profile" active>
      Profile
    </Nav.ItemLink>
    <Nav.ItemLink href="#/login">
      Login
      <BSpan srOnly>(current}</BSpan>
    </Nav.ItemLink>
  </React.Fragment>
)

const logger = new Logger('Navigator');

export default class Navigator extends Component {
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'navigator'); // Add this component as a listener of auth events.

    this.state = { user: null }
  }

  componentDidMount() {
    this.loadUser(); // The first check
  }

  onHubCapsule(capsule) {
    logger.info('on Auth event', capsule);
    this.loadUser(); // Triggered every time user sign in / out.
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user: user }))
      .catch(err => this.setState({ user: null }));
  }

  render() {
    const { user } = this.state;

    return (
      <Navbar expand="md" dark bg="dark" fixed="top">
        <Navbar.Brand href="#">Journal</Navbar.Brand>
        <Navbar.Toggler target="#navbarsExampleDefault" />

        <Navbar.Collapse id="navbarsExampleDefault">
          <Navbar.Nav mr="auto">
            <HashRouter>
              <Switch>
                <Route exact path="/" component={HomeItems} />
                <Route exact path="/profile" component={ProfileItems} />
                <Route exact path="/login" component={LoginItems} />
              </Switch>
            </HashRouter>
          </Navbar.Nav>
          <Navbar.Text mr="2">
            { user? 'Hi ' + user.username : 'Please sign in' }
          </Navbar.Text>
          { user && <JSignOut /> }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
