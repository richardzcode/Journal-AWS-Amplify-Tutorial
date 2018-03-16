---
id: step-02-greetings
title: Step 02 - Authentication
sidebar_label: Greetings
---

# Greetings

Notice after sign in, there is a sign out button. It makes sense to have sign out button. However in our case the place is not right.

**Hide Greetings**

Let's hide this one. `src/modules/Login.jsx` becomes:
```
import React, { Component } from 'react';

import { Authenticator, Greetings } from 'aws-amplify-react';

export default class Login extends Component {
    render() {
        return <Authenticator hide={[Greetings]} />
    }
}
```

`Authenticator` is composed of a group of pieces, `Greetings` is one of them. `hide` defines a list of pieces to be hidden.

**Greetings on Menu**

What we actually want is greetings on the top-right corner. Let's edit `src/App.js` to add menu item with Greetings.

First import Greetings
```
import { Greetings } from 'aws-amplify-react';
```

The default styling doesn't fit in our UI, lets add the menu item and remove default theme of Greetings.
```
const GreetingsTheme = {
    navBar: {
    },
    navRight: {
    },
    navButton: {
        border: '0',
        background: 'white',
        color: 'blue',
        borderBottom: '1px solid',
        fontSize: '0.8em'
    }
}

...

    <Menu.Menu position="right">
        <Menu.Item>
            <Greetings theme={GreetingsTheme} />
        </Menu.Item>
    </Menu.Menu>
```

**Custom Greetings**

Change the greetings
```
    <Greetings
        theme={GreetingsTheme}
        outGreeting="Welcome"
        inGreeting={(username) => 'Hi ' + username}
    />
```

<img src="assets/img/welcome.png" width="400px" />
