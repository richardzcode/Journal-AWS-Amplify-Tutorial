import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Menu } from 'semantic-ui-react';

import Amplify from 'aws-amplify';
import { Greetings } from 'aws-amplify-react';
import aws_exports from './aws-exports';

import Home from './modules/Home';
import Login from './modules/Login';

Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure(aws_exports);

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

class App extends Component {
    constructor(props) {
        super(props);

        this.handleStateChange = this.handleStateChange.bind(this);

        this.state = { active_menu: 'home' }
    }

    handleStateChange(authState, authData) {
        this.setState({
            authState: authState,
            authData: authData
        });
    }

  render() {
    const { authState, authData } = this.state;
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
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Greetings
                                theme={GreetingsTheme}
                                outGreeting="Welcome"
                                inGreeting={(username) => 'Hi ' + username}
                                onStateChange={this.handleStateChange}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Switch>
                    <Route exact path="/" name="home" render={(props) => (
                        <Home {...props} authState={authState} authData={authData} />
                    )}/>
                    <Route exact path="/login" name="login" component={Login}/>
                </Switch>
            </div>
            </HashRouter>
    );
  }
}

export default App;
