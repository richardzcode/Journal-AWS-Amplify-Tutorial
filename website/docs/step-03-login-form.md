---
id: step-03-login-form
title: Step 03 - Authentication UI
sidebar_label: Turn LoginForm into AuthPiece
---

# Turn LoginForm into AuthPiece

The LoginForm actually doesn't do anything at this moment. We need to hook it up with Amplify Auth.

First we turn LoginFrom from const to component. `AuthPiece` is the base class which has some built-in functions to help integrate with Auth. Let's extend from it.
```
import { Auth, Logger } from 'aws-amplify';
import { AuthPiece } from 'aws-amplify-react';

const logger = new Logger('LoginForm');

class LoginForm extends AuthPiece {
    constructor(props) {
        super(props);

        this.signIn = this.signIn.bind(this);
    }

    signIn() {
        const { username, password } = this.inputs;
        logger.debug('username: ' + username);
        Auth.signIn(username, password)
            .then(user => this.changeState('signedIn', user))
            .catch(err => this.error(err));
    }

    ...

    render() {
        ...
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
                name="username"
                onChange={this.handleInputChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password"
                onChange={this.handleInputChange}
              />
              <Button
                    color='teal'
                    fluid
                    size='large'
                    onClick={this.signIn}
              >Login</Button>
        ...
    }
```

Explain a little bit.

1. `this.handleInputChange` is from `AuthPiece`, it saves input value to `this.inputs` with its name.
2. On button click, `signIn` got called, it reads input values from `this.inputs` then call `Auth.signIn`
3. `this.changeState` and `this.error` are from `AuthPiece`, to notify Authenticator success / failure of auth actions.
4. Logger is an organized way of logging. Type `LOG_LEVEL = 'DEBUG'` in console log to see debug logs.

Now run app, login. From Greetings on top-right corner we can see LoginForm works. But why is LoginForm still show up after sign in success.

**Hide LoginForm after Sign In**

Every AuthPiece got `authState` property. So just check `authState` in `render` method. LoginForm would show up in three states: 'signIn', 'signedOut', 'signedUp'
```
    render() {
        const { authState } = this.props;
        if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) { return null; }

        ...
```
