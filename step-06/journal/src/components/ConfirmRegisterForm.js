import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { Auth, Logger } from 'aws-amplify';
import { AuthPiece } from 'aws-amplify-react';

const logger = new Logger('ConfirmRegisterForm');

class ConfirmRegisterForm extends AuthPiece {
    constructor(props) {
        super(props);

        this.confirm = this.confirm.bind(this);
        this.resend = this.resend.bind(this);
    }

    confirm() {
        const username = this.usernameFromAuthData() || this.inputs.username;
        const { code } = this.inputs;
        logger.debug('username: ' + username);
        Auth.confirmSignUp(username, code)
            .then(data => this.changeState('signIn', data))
            .catch(err => this.error(err));
    }

    resend() {
        const { username } = this.inputs;
        logger.debug('username: ' + username);
        Auth.resendSignUp(username)
            .then(() => logger.debug('code resent'))
            .catch(err => this.error(err));
    }

    render() {
        const { authState } = this.props;
        if ('confirmSignUp' !== authState) { return null; }

        const username = this.usernameFromAuthData();

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
                    {' '}Confirm your registration
                  </Header>
                  <Form size='large'>
                    <Segment stacked>
                      {username? <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    name="username"
                                    onChange={this.handleInputChange}
                                  />
                                : <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    value={username}
                                    readOnly
                                  />
                      }
                      <Form.Input
                        fluid
                        icon='puzzle'
                        iconPosition='left'
                        placeholder='Code'
                        name="code"
                        onChange={this.handleInputChange}
                      />

                      <Button.Group>
                          <Button
                                color='teal'
                                size='large'
                                onClick={this.confirm}
                          >Confirm</Button>
                          <Button.Or />
                          <Button
                                color='teal'
                                size='large'
                                onClick={this.resend}
                          >Resend</Button>
                      </Button.Group>
                    </Segment>
                  </Form>
                  <Message>
                    Back to <a onClick={() => this.changeState('signIn')}>Sign In</a>
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
        )
    }
}

export default ConfirmRegisterForm
