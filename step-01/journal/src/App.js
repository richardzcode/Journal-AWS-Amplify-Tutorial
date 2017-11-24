import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import Home from './modules/Home';
import Login from './modules/Login';

import logo from './logo.svg';
import './App.css';

class App extends Component {
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
}

export default App;
