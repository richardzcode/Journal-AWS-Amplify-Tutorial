import React, { Component } from 'react';

import { withAuthenticator, Authenticator, Greetings, SignIn, SignUp } from 'aws-amplify-react';

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
            <Authenticator hideDefault>
                <LoginForm />
                <RegisterForm />
                <ConfirmRegisterForm />
                <VerifyContactForm />
                <ForgotPasswordForm />
            </Authenticator>
        )
    }
}
