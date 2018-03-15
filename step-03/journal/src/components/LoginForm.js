import React from 'react'
import { Button, Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react'

import { Auth, Logger, JS } from 'aws-amplify';
import { AuthPiece, withFederated } from 'aws-amplify-react';

const logger = new Logger('LoginForm');

const FederatedButtons = (props) => (
    <div>
        <Button
            color='blue'
            fluid
            size='large'
            onClick={props.facebookSignIn}
        >Facebook</Button>
    </div>
);

const Federated = withFederated(FederatedButtons);

const federated = {
    google_client_id: '',
    facebook_app_id: '__replace_with_your_facebook_app_id__',
    amazon_client_id: ''
};

class LoginForm extends AuthPiece {
    constructor(props) {
        super(props);

        this.checkContat = this.checkContact.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    checkContact(user) {
        Auth.verifiedContact(user)
            .then(data => {
                if (!JS.isEmpty(data.verified)) {
                    this.changeState('signedIn', user);
                } else {
                    user = Object.assign(user, data);
                    this.changeState('verifyContact', user);
                }
            });
    }

    signIn() {
        const { username, password } = this.inputs;
        logger.debug('username: ' + username);
        Auth.signIn(username, password)
            .then(user => this.checkContact(user))
            .catch(err => this.error(err));
    }

    render() {
        const { authState } = this.props;
        if (!['signIn', 'singedOut', 'signedUp'].includes(authState)) { return null; }

        return (
            <div className='login-form'>
              {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
              */}
              <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                  height: 100%;
                }
              `}</style>
              <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as='h2' color='teal' textAlign='center'>
                    {' '}Log-in to your account
                  </Header>
                  <Form size='large'>
                    <Segment stacked>
                      <Form.Input
                        autoFocus
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        name="username"
                        onChange={this.handleInputChange}
                      />
                      <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name="password"
                        onChange={this.handleInputChange}
                      />

                      <Button
                            color='teal'
                            fluid
                            size='large'
                            onClick={this.signIn}
                      >Login</Button>
                      <Divider/>
                      <Federated federated={federated} onStateChange={this.handleAuthStateChange} />
                    </Segment>
                  </Form>
                  <Message>
                    New to us? <a onClick={() => this.changeState('signUp')}>Sign Up</a>
                  </Message>
                  <Message>
                    <a onClick={() => this.changeState('forgotPassword')}>ForgotPassword</a>
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
        )
    }
}

export default LoginForm
