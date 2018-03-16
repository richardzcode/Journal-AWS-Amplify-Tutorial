---
id: step-03-sign-up
title: Step 03 - Authentication UI
sidebar_label: Sign Up
---

# Sign Up

LoginForm has a 'Sign Up' link. On click it should show Sign Up form.

This can be achieved by `changeState()` method from `AuthPiece`. The method notifies `Authenticator` state change, and then `Authenticator` notify all the Auth Pieces it contains to render properly.

```
        <Message>
            New to us? <a onClick={() => this.changeState('signUp')}>Sign Up</a>
        </Message>
```

Now on click we'll see Sign Up form, but it is the default form. Go through the same process create a RegisterForm. Same to other UI components in auth flow.
