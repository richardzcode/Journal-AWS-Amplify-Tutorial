import React, { Component } from 'react';
import { BDiv, Form, Button, Alert, Row, Col, BA } from 'bootstrap-4-react';
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('JForgotPasswordReset');

export default class JForgotPasswordReset extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
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

  submit() {
    const username = this.props.authData;
    if (!username) {
      this.setState({ error: 'missing username' });
      return;
    }

    const { code, password } = this.inputs;
    logger.info('reset password for ' + username);
    Auth.forgotPasswordSubmit(username, code, password)
      .then(data => this.submitSuccess(username, data))
      .catch(err => this.handleError(err));
  }

  submitSuccess(username, data) {
    logger.info('forgot password reset success for ' + username, data);
    this.changeState('signIn', username);
  }

  handleError(err) {
    logger.info('forgot password reset error', err);
    this.setState({ error: err.message || err });
  }

  render() {
    const { authState } = this.props;
    if (authState !== 'forgotPasswordReset') { return null; }

    const style = {
      width: '20rem',
      input: { borderRadius: '0' },
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
            placeholder="Code"
            rounded="top"
            border="bottom-0"
            style={style.input}
            onChange={event => this.inputs.code = event.target.value}
            autoFocus
          />
          <Form.Input
            type="password"
            placeholder="Password"
            rounded="bottom"
            style={style.input}
            onChange={event => this.inputs.password = event.target.value}
          />
          <Row my="2" style={style.links}>
            <Col text="left">
              <BA href="#" preventDefault onClick={() => this.changeState('forgotPassword')}>
                Back to forgot password
              </BA>
            </Col>
          </Row>
          <Button primary mt="3" style={style.button} onClick={this.submit}>Reset password</Button>
          { error && <Alert warning mt="3" text="left" style={style.alert}>{error}</Alert> }
        </Form>
      </BDiv>
    )
  }
}
