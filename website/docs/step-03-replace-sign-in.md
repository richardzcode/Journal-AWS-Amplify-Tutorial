---
id: step-03-replace-sign-in
title: Step 03 - Authentication UI
sidebar_label: Replace Sign In
---

# Replace Sign In

Let's add a Semantic UI [LoginForm](https://react.semantic-ui.com/layouts/login).

Save the form to `src/components/LoginForm.js`.

Then modify `src/modules/Login.jsx`, hide the default SignIn, add our LoginForm
```
import { Authenticator, Greetings, SignIn } from 'aws-amplify-react';
import { LoginForm } from '../components';

    render() {
        return (
            <Authenticator hide={[Greetings, SignIn]}>
                <LoginForm />
            </Authenticator>
        )
    }
```
Now, looks better

<img src="assets/img/login_form.png" width="400px" />
