import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { Auth, Logger } from 'aws-amplify';
import { AuthPiece } from 'aws-amplify-react';

const logger = new Logger('RegisterForm');

class RegisterForm extends AuthPiece {
    constructor(props) {
        super(props);

        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        const { username, password, email, phone_number } = this.inputs;
        logger.debug('username: ' + username);
        Auth.signUp(username, password, email, phone_number)
            .then(data => this.changeState('confirmSignUp', data))
            .catch(err => this.error(err));
    }

    render() {
        const { authState } = this.props;
        if ('signUp' !== authState) { return null; }

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
                    {' '}Register an account
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
                      <Form.Input
                        fluid
                        icon='mail'
                        iconPosition='left'
                        placeholder='Email'
                        name="email"
                        onChange={this.handleInputChange}
                      />
                      <Form.Input
                        fluid
                        icon='phone'
                        iconPosition='left'
                        placeholder='Phone Number'
                        name="phone_number"
                        onChange={this.handleInputChange}
                      />

                      <Button
                            color='teal'
                            fluid
                            size='large'
                            onClick={this.signUp}
                      >Register</Button>
                    </Segment>
                  </Form>
                  <Message>
                    Have an account? <a onClick={() => this.changeState('signIn')}>Sign In</a>
                  </Message>
                  <Message>
                    <a onClick={() => this.changeState('confirmSignUp')}>Confirm a Code</a>
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
        )
    }
}

export default RegisterForm
