import React, { Component } from 'react';

import { Authenticator, Greetings, SignIn } from 'aws-amplify-react';

import LoginForm from '../components/LoginForm';

export default class Login extends Component {
    render() {
        return (
            <Authenticator hide={[Greetings, SignIn]}>
                <LoginForm />
            </Authenticator>
        )
    }
}
