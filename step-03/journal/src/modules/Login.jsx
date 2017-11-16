import React, { Component } from 'react';

import { Authenticator, Greetings, SignIn, SignUp } from 'aws-amplify-react';

import {
    LoginForm,
    RegisterForm,
    ConfirmRegisterForm,
    VerifyContactForm,
    ForgotPasswordForm
} from '../components';

export default class Login extends Component {
    render() {
        return (
            <Authenticator hide={[Greetings, SignUp]}>
                <LoginForm />
                <RegisterForm />
                <ConfirmRegisterForm />
                <VerifyContactForm />
                <ForgotPasswordForm />
            </Authenticator>
        )
    }
}
