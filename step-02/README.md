# Step 02 - Authentication

AWS Amplify solved the authentication for developers. Let's use it.

* [1. Prepare](#1-prepare)
* [2. Configure AWS Amplify](#2-configure-aws-amplify)
* [3. Add Authenticator](#3-add-authenticator)
* [4. Greetings](#4-greetings)
* [5. Home Page Aware of authState](#5-home-page-aware-of-authstate)
* [6. Run App](#6-run-app)
* [7. Fun Theme](#7-fun-theme)

## 1. Prepare

### Library

Install package, core library and react specific.

```
npm install --save aws-amplify
npm install --save aws-amplify-react
```

### Service

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

Open `src/App.js`, add these lines

```
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
```

## 3. Add Authenticator

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

## 4. Greetings

Notice after sign in the page becomes empty. It is time to update greetings in `<Navigator>`

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

**Check user state**

Now we have a sign out button, but it always shows regardless user signed in or not. We need a way to be aware of user state. This means two tasks:

* Check user state
* Trigger the check whenever user sign in / out.

The fist task is done by an `Auth` method `currentAuthenticatedUser`.

```
  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user: user }))
      .catch(err => this.setState({ user: null }));
  }
```

The second task we can leverage an Amplify utility, `Hub`. Events are dispatched to `Hub` for every sign in / out. We just needed to listen to the events.

```
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'navigator');

    this.state = { user: null }
  }

  onHubCapsule(capsule) {
    this.loadUser();
  }
```

<img src="welcome.png" width="480px" />

## 5. Pages Aware of authState

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
