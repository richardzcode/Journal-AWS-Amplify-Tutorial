---
id: step-01-home-n-login
title: Step 01 - Create a Basic React App
sidebar_label: Create Home and Login Page
---

# Create Home and Login Page

We don't have Home and Login page yet. Let's create them.

`src/modules/Home.jsx`
```
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class Home extends Component {
    render() {
        return (
            <div id="home-module">
                <Header as="h1">Home</Header>
            </div>
        );
    }
}
```

`src/modules/Login.jsx`
```
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class Login extends Component {
    render() {
        return (
            <div id="login-module">
                <Header as="h1">Login</Header>
            </div>
        );
    }
}
```
