import React, { Component } from 'react';
import { BDiv, Form, ButtonGroup, Button, Alert, Row, Col, BA } from 'bootstrap-4-react';
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('JConfirmSignUp');

export default class JConfirmSignUp extends Component {
  constructor(props) {
    super(props);
    this.confirmSignUp = this.confirmSignUp.bind(this);
    this.resendCode = this.resendCode.bind(this);
    this.changeState = this.changeState.bind(this);
    this.inputs = {};
    this.state = { message: '', error: '' }
  }

  changeState(state, data) {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  confirmSignUp() {
    const username = this.props.authData || this.inputs.username;
    const { code } = this.inputs;
    logger.info('confirm sign up with ' + code);
    Auth.confirmSignUp(username, code)
      .then(() => this.confirmSuccess(username))
      .catch(err => this.handleError(err));
  }

  resendCode() {
    const username = this.props.authData || this.inputs.username;
    logger.info('resend code to ' + username);
    Auth.resendSignUp(username)
      .then(() => this.setState({ message: 'Code sent' }))
      .catch(err => this.handleError(err));
  }

  confirmSuccess(username) {
    logger.info('confirm sign up success with ' + username);
    this.setState({ message: '', error: '' });
    this.changeState('signIn', username);
  }

  handleError(err) {
    logger.info('confirm sign up error', err);
    this.setState({ message: '', error: err.message || err });
  }

  render() {
    const { authState, authData } = this.props;
    if (authState !== 'confirmSignUp') { return null; }

    const style = {
      width: '20rem',
      input: { borderRadius: '0' },
      links: { fontSize: '0.9em' },
      button: { width: '100%' },
      alert: { fontSize: '0.8em' }
    }

    const { message, error } = this.state;

    return (
      <BDiv display="flex" flex="column" alignItems="center">
        <Form style={style} preventDefault>
          <Form.Input
            type="text"
            placeholder="Username"
            defaultValue={authData || ''}
            rounded="top"
            border="bottom-0"
            style={style.input}
            onChange={event => this.inputs.username = event.target.value}
            htmlDisabled={!!authData}
          />
          <Form.Input
            type="text"
            placeholder="Code"
            rounded="bottom"
            style={style.input}
            onChange={event => this.inputs.code = event.target.value}
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
          <ButtonGroup mt="3" style={style.button}>
            <Button primary flex="grow-1" onClick={this.confirmSignUp}>Confirm</Button>
            <Button success flex="grow-1" onClick={this.resendCode}>Resend</Button>
          </ButtonGroup>
          { message && <Alert success mt="3" text="left" style={style.alert}>{message}</Alert> }
          { error && <Alert warning mt="3" text="left" style={style.alert}>{error}</Alert> }
        </Form>
      </BDiv>
    )
  }
}
