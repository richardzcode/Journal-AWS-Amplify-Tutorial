---
id: step-02-authenticator
title: Step 02 - Authentication
sidebar_label: Add Authenticator
---

# Add Authenticator

Open `src/modules/Login.jsx`, change content to:
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

<img src="assets/img/authenticator.png" width="400px" />

Got ahead sign up and sign in. Create a test user.
