# Step 02 - Amplify Authentication

AWS Amplify solved the authentication for developers. Let's use it.

* [1. Install and Setup](#1-install-and-setup)
  * [Install AWS Amplify](#install-aws-amplify)
  * [Setup AWS services](#setup-aws-services)
* [2. Configure AWS Amplify](#2-configure-aws-amplify)
* [3. Amplify Authenticator](#3-amplify-authenticator)
* [4. Greetings on Navbar](#4-greetings-on-navbar)
  * [Sign out button](#sign-out-button)
  * [Check user state](#check user state)
* [5. Home Page and authState](#5-home-page-and-authstate)
* [6. Run App](#6-run-app)

## 1. Install and Setup

### Install AWS Amplify

Install package, core library and react specific.

```
npm install --save aws-amplify
npm install --save aws-amplify-react
```

### Setup AWS services

Create a AWS Mobile Hub project with [awsmobile-CLI](https://github.com/aws/awsmobile-cli)

```
npm install -g awsmobile-cli

awsmobile configure # first time use of CLI, setup with AWS_ACCESS_KEY and AWS_SECRET_KEY

awsmobile init
awsmobile user-signin enable
awsmobile user-files enable
awsmobile push
```

This [guide](https://aws-amplify.github.io/amplify-js/media/quick_start.html) have detailed information of how to setup a AWS Mobile Hub and work with AWS Amplify.

## 2. Configure AWS Amplify

With CLI, AWS service settings are generated at `src/aws-exports.js`. Open `src/App.js`, add these lines to configure.

```
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
```

## 3. Amplify Authenticator

Open `src/pages/Login.jsx`, change content to:

```
import React, { Component } from 'react';

import { Authenticator } from 'aws-amplify-react';

export default class Login extends Component {
    render() {
        return <Authenticator />
    }
}
```

Now `npm start`. Login becomes real

<img src="authenticator.png" width="480px" />

Got ahead sign up and sign in. Create a test user.

## 4. Greetings on Navbar

Notice after sign in the page becomes empty. It is time to update greetings in `<Navigator>`

### Sign out button

First add 'sign out' button, right after 'Greetings' text

`src/components/Navigator.jsx`

```
...
import { SignOut } from 'aws-amplify-react';
...

  render() {
    ...
          <Navbar.Text>Greetings</Navbar.Text>
          <SignOut />
    ...
  }
```

### Check user state

Now we have a sign out button, but it always shows regardless user signed in or not. We need a way to be aware of user state. This means two tasks:

* Check user state
* Trigger the check whenever user sign in / out.

The fist task is done by an `Auth` method `currentAuthenticatedUser`.

The second task we can leverage an Amplify utility, `Hub`. Events are dispatched to `Hub` for every sign in / out. We just needed to listen to the events.

```
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'navigator'); // Add this component as listener of auth event.

    this.state = { user: null }
  }

  componentDidMount() {
    this.loadUser(); // The first check
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user: user }))
      .catch(err => this.setState({ user: null }));
  }

  onHubCapsule(capsule) {
    this.loadUser(); // Triggered every time user sign in / out
  }
```

<img src="welcome.png" width="480px" />

## 5. Home Page and authState

Do the same to `src/components/Main.jsx`, and modify its `render` method to pass current user to pages.

```
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
```

Modify `src/pages/Login.jsx` so it renders depend on user state.

```
import React, { Component } from 'react';
import { Lead } from 'bootstrap-4-react';
import { Authenticator } from 'aws-amplify-react';

export default class Login extends Component {
  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        { !user && <Authenticator /> }
        { user && <Lead>You are signed in as <BSpan font="italic">{user.username}</BSpan>.</Lead> }
      </React.Fragment>
    )
  }
}
```

Similar to `src/pages/Home.jsx`.

## 6. Run App

```
npm start
```

[Step 03 - Customize Authentication UI](../step-03)
