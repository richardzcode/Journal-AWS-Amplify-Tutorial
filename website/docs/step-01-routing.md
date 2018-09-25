---
id: step-01-routing
title: Step 01 - Create a Basic React App with Bootstrap
sidebar_label: Page Routing
---

# Page Routing

Modify `src/components/Main.jsx` to route to Home or Login page.

```
import React, { Component } from 'react';
import { Container } from 'bootstrap-4-react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Home, Login } from '../pages';

export default class Main extends Component {
  render() {
    return (
      <Container as="main" role="main">
        <div className="starter-template">
          <HashRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </HashRouter>
        </div>
      </Container>
    )
  }
}
```
