import React from 'react'
import { Button, Form, Grid, Header, Message, Segment, Container } from 'semantic-ui-react'

import { Auth, Logger } from 'aws-amplify';
import { AuthPiece } from 'aws-amplify-react';

const logger = new Logger('VerifyContactForm');

class VerifyContactForm extends AuthPiece {
    constructor(props) {
        super(props);

        this.verify = this.verify.bind(this);
        this.submit = this.submit.bind(this);

        this.state = { verifyAttr: null };
    }

    verify() {
        const { email, phone_number } = this.inputs;
        if (!email && !phone_number) {
            this.error('Neither Email nor Phone Number selected');
            return;
        }

        const attr = email? 'email' : 'phone_number';
        Auth.verifyCurrentUserAttribute(attr)
            .then(data => {
                logger.debug(data);
                this.setState({ verifyAttr: attr });
            })
            .catch(err => this.error(err));
    }

    submit() {
        const attr = this.state.verifyAttr;
        const { code } = this.inputs;
        Auth.verifyCurrentUserAttributeSubmit(attr, code)
            .then(data => {
                logger.debug(data);
                this.changeState('signedIn', this.props.authData);
                this.state = { verifyAttr: null };
            })
            .catch(err => this.error(err));
    }

    verifyView() {
        return (
            <Segment stacked>
              <Container textAlign="left">
                <Form.Radio
                    label="Email"
                    key="email"
                    name="email"
                    onChange={(evt, semantic_data) => this.handleInputChange({ target: semantic_data })}
                 />
                  <Form.Radio
                    label='Phone Number'
                    key="phone_number"
                    name="phone_number"
                    onChange={(evt, semantic_data) => this.handleInputChange({ target: semantic_data })}
                  />
              </Container>

              <Button
                    color='teal'
                    fluid
                    size='large'
                    onClick={this.verify}
              >Verify</Button>
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
        if ('verifyContact' !== authState) { return null; }

        const { verifyAttr } = this.state;

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
                      { verifyAttr? this.submitView() : this.verifyView() }
                  </Form>
                  <Message>
                    <a onClick={() => this.changeState('signedIn')}>Skip</a>
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
        )
    }
}

export default VerifyContactForm
