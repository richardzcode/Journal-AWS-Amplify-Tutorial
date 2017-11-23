# Step 01 - Create a Basic React App

* [1. Create React App](#1-create-react-app)
* [2. Add React Router](#2-add-react-router)
* [3. Add Semantic UI React](#3-add-semantic-ui-react)
* [4. Menu and Routing](#4-menu-and-routing)
* [5. Create Home and Login Page](#5-create-home-and-login-page)
* [6. Run App](#6-run-app)

## 1. Create React App
```
create-react-app journal
cd journal
npm start
```

## 2. Add React Router
Let's use [react-router](https://github.com/ReactTraining/react-router) for routing.
```
npm install --save react-router-dom
```

## 3. Add Semantic UI React
Let's use [Semantic UI React](https://react.semantic-ui.com) for nicer looking UI.
```
npm install --save semantic-ui-react
```

There are a few ways to add CSS for Semantic UI, here is one way:
```
npm install --save semantic-ui-css
```

Then open `src/index.js`, add
```
import 'semantic-ui-css/semantic.min.css';
```

## 4. Menu and Routing
Let's start with a Home page and a Login Page.

Open `src/App.js`, import
```
import { Router, Route, Link, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Menu } from 'semantic-ui-react';

import Home from './modules/Home';
import Login from './modules/Login';
```

Initial state
```
    constructor(props) {
        super(props);

        this.state = { active_menu: 'home' }
    }
```

Listen to route change in order to set active menu correctly
```
    setActiveMenu(pathname) {
        const path_to_menu = [
            ['/', 'home'],
            ['/login', 'login']
        ];
        const active = path_to_menu.filter(entry => { return entry[0] === pathname; })
                .reduce((result, entry) => { return entry[1]; }, '');;
        this.setState({
            active_menu: active || 'home'
        });
    };

    componentWillMount() {
        this.history = createBrowserHistory();
        this.setActiveMenu(this.history.location.pathname);
        const that = this;
        this.history.listen((location, action) => {
            that.setActiveMenu(location.pathname);
        });
    }
```

Render method:
```
    render() {
        return (
            <Router history={this.history}>
            <div>
                <Menu>
                    <Menu.Item active={this.state.active_menu === 'home'}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item active={this.state.active_menu === 'login'}>
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                </Menu>
                <Switch>
                    <Route exact path="/" name="home" component={Home}/>
                    <Route exact path="/login" name="login" component={Login}/>
                </Switch>
            </div>
            </Router>
        );
    }
```

## 5. Create Home and Login Page
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

## 6. Run App

```
npm start
```

[Step 02 - Authentication](../step-02)
