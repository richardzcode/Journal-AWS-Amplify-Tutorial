import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
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

    handleStateChange(authState, authData) {
        this.setState({
            authState: authState,
            authData: authData
        });
    }

  render() {
    const { authState, authData, sidebar_visible } = this.state;
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
                            <Route exact path="/" name="home" render={(props) => {
                                return (
                                    <Home {...props} authState={authState} authData={authData} />
                                )
                            }}/>
                            <Route exact path="/login" name="login" component={Login}/>
                        </Switch>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
            </HashRouter>
    );
  }
}

export default App;
