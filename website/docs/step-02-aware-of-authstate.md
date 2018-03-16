---
id: step-02-aware-of-authstate
title: Step 02 - Authentication
sidebar_label: Home Page Aware of authState
---

# Home Page Aware of authState

Now sign in works. How does Home page know if an user is signed in or not?

We have `Greetings` now. So just listen to its `onStateChange` event, then pass to Home component in router.

In `src/App.js`
```
    constructor(props) {
        ...
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleStateChange(authState, authData) {
        this.setState({
            authState: authState,
            authData: authData
        });
    }

    
```

```
        <Greetings
            theme={GreetingsTheme}
            outGreeting="Welcome"
            inGreeting={(username) => 'Hi ' + username}
            onStateChange={this.handleStateChange}
        />
```

```
        <Route exact path="/" name="home" render={(props) => (
            <Home {...props} authState={authState} authData={authData} />
        )}/>
```

Then, in `src/modules/Home.jsx`, just check `authState` property
```
    render() {
        const { authState, authData } = this.props;
        return (
            <div id="home-module">
                <Header as="h1">Home</Header>
                <div>{authState}</div>
            </div>
        );
    }
```
