import React, { Component } from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Segment, Sidebar, Menu, Icon, Message } from 'semantic-ui-react';

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

    handleStateChange(authState, authData) {
        this.setState({
            authState: authState,
            authData: authData
        });
    }

  render() {
    const { authState, authData, sidebar_visible } = this.state;
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
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Greetings
                                theme={GreetingsTheme}
                                outGreeting="Welcome"
                                inGreeting={(username) => 'Hi ' + username}
                                onStateChange={this.handleStateChange}
                            />
                            <Icon
                                name="github"
                                size="large"
                                onClick={() => this.setState({ sidebar_visible: !this.state.sidebar_visible })}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Segment}
                        animation="overlay"
                        direction="top"
                        width="thin"
                        visible={sidebar_visible}
                    >
                        <Message icon>
                            <Icon name="github" />
                            <Message.Content>
                                <Message.Header>GitHub:</Message.Header>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial"
                                >
                                    https://github.com/richardzcode/Journal-AWS-Amplify-Tutorial
                                </a>
                            </Message.Content>
                        </Message>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Switch>
                            <Route exact path="/" name="home" render={(props) => (
                                <Home {...props} authState={authState} authData={authData} />
                            )}/>
                            <Route exact path="/login" name="login" component={Login}/>
                        </Switch>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
            </Router>
    );
  }
}

export default App;
