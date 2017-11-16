import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { Auth, Logger } from 'aws-amplify';
import { AuthPiece } from 'aws-amplify-react';

const logger = new Logger('LoginForm');

class LoginForm extends AuthPiece {
    constructor(props) {
        super(props);

        this.signIn = this.signIn.bind(this);
    }

    signIn() {
        const { username, password } = this.inputs;
        logger.debug('username: ' + username);
        Auth.signIn(username, password)
            .then(data => this.changeState('signedIn', data))
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
