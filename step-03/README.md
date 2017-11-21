# Step 03 - Authentication UI

The default Auth UI is good. However it doesn't fit with our theme. Let's replace it.

* [1. Replace Sign In](#1-replace-sign-in)
* [2. Turn LoginForm into AuthPiece](#2-turn-loginform-into-authpiece)
* [3. Check Contact Verification](#3-check-contact-verication)
* [4. Sign Up](#4-sign-up)
* [5. Replace all Auth components](#5-replace-all-auth-components)
l [6. Run App](#6-run-app)

## 1. Replace Sign In

Let's add a Semantic UI [LoginForm](https://react.semantic-ui.com/layouts/login).

Save the form to `src/components/LoginForm.js`.

Then modify `src/modules/Login.jsx`, hide the default SignIn, add our LoginForm
```
import { Authenticator, Greetings, SignIn } from 'aws-amplify-react';

    render() {
        return (
            <Authenticator hide={[Greetings, SignIn]}>
                <LoginForm />
            </Authenticator>
        )
    }
```
Now, looks better

<img src="login_form.png" width="400px" />

## 2. Turn LoginForm into AuthPiece

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

## 3. Check Contact Verification

User may forget password. In order to be able to recover password, user has to have one of the contact info verified. We should prompt user about this.

Update `src/components/LoginForm`:
```
    constructor(props) {
        super(props);

        this.checkContat = this.checkContact.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    checkContact(user) {
        Auth.verifiedContact(user)
            .then(data => {
                if (!JS.isEmpty(data.verified)) {
                    this.changeState('signedIn', user);
                } else {
                    user = Object.assign(user, data);
                    this.changeState('verifyContact', user);
                }
            });
    }

    signIn() {
        const { username, password } = this.inputs;
        logger.debug('username: ' + username);
        Auth.signIn(username, password)
            .then(user => this.checkContact(user))
            .catch(err => this.error(err));
    }
```

## 4. Sign Up

LoginForm has a 'Sign Up' link. On click it should show Sign Up form.

This can be achieved by `changeState()` method from `AuthPiece`. The method notifies `Authenticator` state change, and then `Authenticator` notify all the Auth Pieces it contains to render properly.

```
        <Message>
            New to us? <a onClick={() => this.changeState('signUp')}>Sign Up</a>
        </Message>
```

Now on click we'll see Sign Up form, but it is the default form. Go through the same process create a RegisterForm. Same to other UI components in auth flow.

## 5. Replace all Auth components

In process of replacing all Auth components. Here are a couple small things.

**Semantic UI radio button**

The radio button from Semantic UI fires `onChange` event on label as target. Which will cause an issue in collecting state. The actual radio button state is passed as the second parameter. We need to translate it before calling `this.handleInputChange`

For example in `src/components/VerifyContactForm.js`
```
        <Form.Radio
            label="Email"
            name="email"
            onChange={(evt, semantic_data) => this.handleInputChange({ target: semantic_data })}
         />
          <Form.Radio
            label='Phone Number'
            name="phone_number"
            onChange={(evt, semantic_data) => this.handleInputChange({ target: semantic_data })}
          />
```

**hideDefault**

In order to replace default Auth forms, we provide `hide` list to `Authenticator`. Once all reaplaced, we could simply pass a `hideDefault` property, no need to write the whole list.

```
    <Authenticator hideDefault />
```

## 6. Run App

```
npm start
```
