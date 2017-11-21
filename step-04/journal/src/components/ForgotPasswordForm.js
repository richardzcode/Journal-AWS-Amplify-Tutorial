import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { Auth, Logger } from 'aws-amplify';
import { AuthPiece } from 'aws-amplify-react';

const logger = new Logger('ForgotPasswordForm');

class ForgotPasswordForm extends AuthPiece {
    constructor(props) {
        super(props);

        this.send = this.send.bind(this);
        this.submit = this.submit.bind(this);

        this.state = { delivery: null }
    }

    send() {
        const { username } = this.inputs;
        Auth.forgotPassword(username)
            .then(data => {
                logger.debug(data)
                this.setState({ delivery: data.CodeDeliveryDetails });
            })
            .catch(err => this.error(err));
    }

    submit() {
        const { username, code, password } = this.inputs;
        Auth.forgotPasswordSubmit(username, code, password)
            .then(data => {
                logger.debug(data);
                this.changeState('signIn');
                this.setState({ delivery: null });
            })
            .catch(err => this.error(err));
    }

    sendView() {
        return (
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
                key="username"
                name="username"
                onChange={this.handleInputChange}
              />

              <Button
                    color='teal'
                    fluid
                    size='large'
                    onClick={this.send}
              >Send</Button>
            </Segment>
        )
    }

    submitView() {
        return (
            <Segment stacked>
              <Form.Input
                fluid
                icon='puzzle'
                iconPosition='left'
                placeholder='Code'
                key="code"
                name="code"
                onChange={this.handleInputChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='New Password'
                type='password'
                key="password"
                name="password"
                onChange={this.handleInputChange}
              />

              <Button
                    color='teal'
                    fluid
                    size='large'
                    onClick={this.submit}
              >Submit</Button>
            </Segment>
        )
    }

    render() {
        const { authState } = this.props;
        if ('forgotPassword' !== authState) { return null; }

        const { delivery } = this.state;
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
                    {' '}Forgot password
                  </Header>
                  <Form size='large'>
                    { delivery? this.submitView() : this.sendView() }
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

export default ForgotPasswordForm
