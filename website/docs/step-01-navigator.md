---
id: step-01-navigator
title: Step 01 - Create a Basic React App with Bootstrap
sidebar_label: Adjust Navigator
---

# Adjust Navigator

We don't need everything from starter template. Let's adjust. Assume we start with a Home page and a Login page.

Open `src/components/Navigator.jsx`

* Update `<Navbar.Brand>` content to 'Journal'.
* Remove 'Disabled' and 'Dropdown' menu items.
* Update 'Link' to 'Login'.
* Replace search with 'Greetings' text.

With `react-router` components. `Navigator.jsx` become,

```
import React, { Component } from 'react';
import { Navbar, Nav, BSpan } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const HomeItems = props => (
  <React.Fragment>
    <Nav.ItemLink href="#/" active>
      Home
      <BSpan srOnly>(current}</BSpan>
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
    <Nav.ItemLink href="#/login" active>
      Login
      <BSpan srOnly>(current}</BSpan>
    </Nav.ItemLink>
  </React.Fragment>
)

export default class Navigator extends Component {
  render() {
    return (
      <Navbar expand="md" dark bg="dark" fixed="top">
        <Navbar.Brand href="#">Journal</Navbar.Brand>
        <Navbar.Toggler target="#navbarsExampleDefault" />

        <Navbar.Collapse id="navbarsExampleDefault">
          <Navbar.Nav mr="auto">
            <HashRouter>
              <Switch>
                <Route exact path="/" component={HomeItems} />
                <Route exact path="/login" component={LoginItems} />
              </Switch>
            </HashRouter>
          </Navbar.Nav>
          <Navbar.Text>Greetings</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
```
