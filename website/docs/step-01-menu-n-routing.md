---
id: step-01-menu-n-routing
title: Step 01 - Create a Basic React App
sidebar_label: Menu and Routing
---

# Menu and Routing

Let's start with a Home page and a Login Page.

Open `src/App.js`, import
```
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import Home from './modules/Home';
import Login from './modules/Login';
```

Render method:
```
    render() {
        return (
            <HashRouter>
            <div>
                <Menu>
                    <Switch>
                        <Route exact path="/">
                            <Menu.Menu>
                                <Menu.Item active><Link to="/">Home</Link></Menu.Item>
                                <Menu.Item><Link to="/login">Login</Link></Menu.Item>
                            </Menu.Menu>
                        </Route>
                        <Route exact path="/login">
                            <Menu.Menu>
                                <Menu.Item><Link to="/">Home</Link></Menu.Item>
                                <Menu.Item active><Link to="/login">Login</Link></Menu.Item>
                            </Menu.Menu>
                        </Route>
                    </Switch>
                </Menu>
                <Switch>
                    <Route exact path="/" name="home" component={Home}/>
                    <Route exact path="/login" name="login" component={Login}/>
                </Switch>
            </div>
            </HashRouter>
        );
    }
```
