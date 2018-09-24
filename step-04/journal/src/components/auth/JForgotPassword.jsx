import React, { Component } from 'react';
import { BDiv, Form, Button, Alert, Row, Col, BA } from 'bootstrap-4-react';
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('JForgotPassword');

export default class JForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.sendCode = this.sendCode.bind(this);
    this.changeState = this.changeState.bind(this);
    this.inputs = {};
    this.state = { error: '' }
  }

  changeState(state, data) {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  sendCode() {
    const username = this.props.authData || this.inputs.username;
    logger.info('resend code to ' + username);
    Auth.forgotPassword(username)
      .then(data => this.sendSuccess(username, data))
      .catch(err => this.handleError(err));
  }

  sendSuccess(username, data) {
    logger.info('sent code for ' + username, data);
    this.changeState('forgotPasswordReset', username);
  }

  handleError(err) {
    logger.info('forgot password send code error', err);
    this.setState({ error: err.message || err });
  }

  render() {
    const { authState, authData } = this.props;
    if (authState !== 'forgotPassword') { return null; }

    const style = {
      width: '20rem',
      links: { fontSize: '0.9em' },
      button: { width: '100%' },
      alert: { fontSize: '0.8em' }
    }

    const { error } = this.state;

    return (
      <BDiv display="flex" flex="column" alignItems="center">
        <Form style={style} preventDefault>
          <Form.Input
            type="text"
            placeholder="Username"
            defaultValue={authData || ''}
            onChange={event => this.inputs.username = event.target.value}
            autoFocus
          />
          <Row my="2" style={style.links}>
            <Col text="left">
              <BA href="#" preventDefault onClick={() => this.changeState('signIn')}>
                Back to sign in
              </BA>
            </Col>
            <Col text="right">
            </Col>
          </Row>
          <Button primary mt="3" style={style.button} onClick={this.sendCode}>Send password reset code</Button>
          { error && <Alert warning mt="3" text="left" style={style.alert}>{error}</Alert> }
        </Form>
      </BDiv>
    )
  }
}
