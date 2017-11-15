import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Menu } from 'semantic-ui-react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import Home from './modules/Home';
import Login from './modules/Login';

Amplify.configure(aws_exports);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { active_menu: 'home' }
    }

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
}

export default App;
